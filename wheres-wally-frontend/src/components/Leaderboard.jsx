import { useEffect, useState } from "react";
import { SCENES } from "../scenes";
import { APIURL } from "../utils/config";

const TOPK = 50;

export default function Leaderboard({ open, mode, sceneId, gameSessionId, time, onPlay, onClose }) {
  if (!open) return null;
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false)
  const [playerRank, setPlayerRank] = useState(null)
  const [name, setName] = useState("");
  const scene = SCENES.find(s => s.id === sceneId)?.image;

  useEffect(() => {
    if (!open) return;

    async function fetchScores() {
      setLoading(true);
      const res = await fetch(`${APIURL}api/images/${sceneId}/scores`)
      const data = await res.json()
      setScores(data);
      setLoading(false);
    }

    fetchScores();
  }, [open, sceneId]);

  async function handleSubmit() {
    await fetch(`${APIURL}api/scores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        game_session_id: gameSessionId,
        name: name
      })
    });

    const res = await fetch(`${APIURL}api/images/${sceneId}/scores`);
    const data = await res.json();

    setScores(data);
    setSubmitted(true);

    const index = data.findIndex(
      (s) => s.game_session_id === gameSessionId
    );
    setPlayerRank(index >= 0 ? index + 1 : null);
  }
  
  function completionSection(time) {
    return (
        <div 
          className={`
            score-row player-row
            ${playerRank === 1 ? "first" : ""}
            ${playerRank === 2 ? "second" : ""}
            ${playerRank === 3 ? "third" : ""}
          `}
        >
          {submitted ? (
            <>
              <div className="rank">#{playerRank}</div>
              <div className="score-name">{name}</div>
            </>
          ) : (
            <>
              <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={!name.trim()}
              >
                ✓
              </button>
              <input
                className="player-input"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
              />
            </>
          )}
          <div className="score-duration">{time}s</div>
        </div>
    );
  }

  function leaderboardList() {
    return (
      <div className={`leaderboard-list ${mode}`}>
        {scores.length === 0 
        ? (
          <p className="empty">{loading ? "Loading..." : "No scores yet"}</p>
        ) : (
          <ol>
            {scores.slice(0, TOPK).map((score, index) => (
              <li 
                className={`
                  score-row 
                  ${index === 0 ? "first" : ""}
                  ${index === 1 ? "second" : ""}
                  ${index === 2 ? "third" : ""}
                  ${score.game_session_id === gameSessionId ? "current-session": ""}
                `}
                key={score.id}
              >
                <div className="rank">#{index + 1}</div>
                <div className="score-name">{score.name}</div>
                <div className="score-duration">{score.duration}s</div>
              </li>
            ))}
          </ol>
        )}
      </div>
    );
  }
  
  return (
    <div className="modal-overlay">
      <div className="leaderboard-wrapper">
        <img src={scene} className="leaderboard-bg" />
        <div className="leaderboard">
          <h2>Leaderboard</h2>

          {leaderboardList()}

          {mode === "complete" && ( 
            completionSection(time)
          )}

          <button
            className="play-button" 
            onClick={onPlay}
          >{mode === "complete" ? "Next" : "Play" }</button>

          <button className="home-button" onClick={onClose}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
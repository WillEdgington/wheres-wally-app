import { useEffect, useState } from "react";
import { APIURL } from "../utils/config";

const TOPK = 50;

export default function Leaderboard({ open, mode, sceneId, gameSessionId, time, onPlay, onClose }) {
  if (!open) return null;
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState("");

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
  }
  
  function completionSection(time) {
    const playerRank = scores.findIndex((s) => s.duration > time) + 1 || scores.length + 1;
    return (
      <div className="completion-section">
        <div className="score-row player-row">
          <div className="rank">#{playerRank}</div>
          {submitted ? (
            <div className="score-name">{name}</div>
          ) : (
            <input
              className="player-input"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <div className="score-duration">{time}s</div>
        </div>
      </div>
    );
  }

  function leaderboardList() {
    return (
      <div className="leaderboard-list">
        {scores.length == 0 
        ? (
          <p className="empty">{loading ? "Loading..." : "No scores yet"}</p>
        ) : (
          <ol>
            {scores.slice(0, TOPK).map((score, index) => (
              <li className="score-row" key={score.id}>
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
      <div className="leaderboard">
        <h2>Leaderboard</h2>

        {leaderboardList()}

        {mode === "complete" 
          ? completionSection(time)
          : mode === "preview" && (
              <button
                className="play-button" 
                onClick={onPlay}
              >Play</button>
          )
        }
        <button className="icon-button" onClick={onClose}>
          HOME
        </button>
      </div>
    </div>
  );
}
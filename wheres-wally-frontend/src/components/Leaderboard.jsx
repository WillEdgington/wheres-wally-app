import { useEffect, useState } from "react";
import { APIURL } from "../utils/config";

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
    return (
      <div className="completion-section">
        <p>Your Time: <strong>{time}s</strong></p>
        {submitted ? (
          <p>score submitted</p>
        ) : (
          <div className="score-submit">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            <button 
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="modal-overlay">
      <div className="leaderboard">
        <h2>Leaderboard</h2>

        {loading ? (
          <p>Loading...</p>
        ) : scores.length === 0
        ? (
          <p>No scores yet</p>
        ) : (
          <ol>
            {scores.map((score) => (
              <li key={score.id}>
                <div className="score-name">{score.name}</div>
                <div className="score-duration">{score.duration}s</div>
              </li>
            ))}
          </ol>
        )}

        {mode === "complete" 
          ? completionSection(time)
          : mode === "preview" && (
              <button onClick={onPlay}>Play</button>
          )
        }
        <button onClick={onClose}>
          Back to Menu
        </button>
      </div>
    </div>
  );
}
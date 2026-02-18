export default function Leaderboard({ open, mode, sceneId, time, onPlay, onClose, onSubmitName }) {
  if (!open) return null;
  
  function completionSection({ time }) {
    return (
      <div className="completion-section">
        <p>Your Time: <strong>{time}s</strong></p>
        <input 
          type="text"
          placeholder="Enter your name"
          id="leaderboard-name"
        />
        <button 
          onClick={() => {
            const name =
              document.getElementById("leaderboard-name").value;
            onSubmitName(name);
          }}
        >
          Submit
        </button>
      </div>
    );
  }
  
  return (
    <div className="modal-overlay">
      <div className="leaderboard">
        <h2>Leaderboard</h2>

        {/* leaderboard here */}
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
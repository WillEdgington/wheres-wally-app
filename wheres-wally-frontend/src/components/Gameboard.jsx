import TargetBox from "./TargetBox"
import scene from "../assets/scene.jpg";

export default function Gameboard({ target, setTarget }) {
  function handleBoardClick(e) {
    e.stopPropagation()
    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setTarget({ x, y });
  }

  async function handleCharacterSelect(characterName) {
    if (!target) return;

    const response = await fetch("http://localhost:3000/api/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image_id: 1,
        character: characterName,
        x: target.x,
        y: target.y
      })
    });
    const data = await response.json();
    data.correct ? alert("Correct!") : alert("Incorrect!");

    setTarget(null);
  }

  function clearTarget() {
    setTarget(null);
  }

  return (
    <div
      className="game-board"
      onClick={handleBoardClick}
    >
      <img
        src={scene}
        alt="Find the characters"
      />

      {target && (
        <TargetBox
          x={target.x}
          y={target.y}
          onSelect={handleCharacterSelect}
        />
      )}
    </div>
  );
}
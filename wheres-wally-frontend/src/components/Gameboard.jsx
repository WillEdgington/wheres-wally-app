import TargetBox from "./TargetBox"
import scene from "../assets/scene.jpg";

export default function Gameboard({ target, setTarget }) {
  function handleBoardClick(e) {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setTarget({ x, y });
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
          onSelect={clearTarget}
        />
      )}
    </div>
  );
}
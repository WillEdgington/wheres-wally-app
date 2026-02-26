export default function ZoomControls({ setScale }) {
  return (
    <div 
      className="zoom-controls"
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={() => setScale(s => Math.max(s - 0.2, 1))}>−</button>
      <button onClick={() => setScale(s => Math.min(s + 0.2, 3))}>+</button>
    </div>
  );
}
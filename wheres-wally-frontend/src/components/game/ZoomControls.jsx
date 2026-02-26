export default function ZoomControls({ setScale }) {
  function buttonClick(e, sign) {
    e.stopPropagation()
    if (sign !== 1 && sign !== -1) return;
    setScale(s => Math.min(Math.max(s + (0.2 * sign), 1), 3));
  }

  return (
    <div 
      className="zoom-controls"
    >
      <button onClick={(e) => buttonClick(e, 1)}>+</button>
      <button onClick={(e) => buttonClick(e, -1)}>−</button>
    </div>
  );
}
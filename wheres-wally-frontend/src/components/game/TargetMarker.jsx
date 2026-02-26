export default function TargetMarker({ x, y }) {
  return (
    <div 
      className="target-marker"
      style={{
        left: `${x}%`,
        top: `${y}%`
      }}
    />
  );
}
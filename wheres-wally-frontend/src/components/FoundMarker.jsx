export default function FoundMarker({ character, data }) {
  return (
    <div 
      key={character}
      className="found-marker"
      style={{
        top: `${data.y}%`,
        left: `${data.x}%`
      }}
    />
  );
}
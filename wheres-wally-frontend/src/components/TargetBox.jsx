import CharacterMenu from "./CharacterMenu";

export default function TargetBox({ x, y, onSelect, foundCharacters }) {
  return (
    <div
      className="target-box"
      style={{
        top: `${y - 6}%`,
        left: `${x - 3}%`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <CharacterMenu 
        onSelect={onSelect}
        foundCharacters={foundCharacters}
      />
    </div>
  );
}
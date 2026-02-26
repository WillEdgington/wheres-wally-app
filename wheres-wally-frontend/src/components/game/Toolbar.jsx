import Timer from "./Timer";
import CharacterMenu from "./CharacterMenu";

export default function Toolbar({ 
  characters, 
  foundCharacters, 
  onCharacterClick, 
  hasTarget, 
  startTime,
  duration,
  onExit
}) {
  return (
    <div className="toolbar">
      <Timer 
        startTime={startTime}
        duration={duration}
      />
      
      <CharacterMenu 
        characters={characters}
        foundCharacters={foundCharacters}
        onSelect={onCharacterClick}
        disabled={!hasTarget}
      />
      
      <button 
        className="home-button" 
        onClick={onExit}
      >
        Home
      </button>
    </div>
  );
}
import { CHARACTERS } from "../../characters";

export default function CharacterMenu({ 
  onSelect, 
  foundCharacters, 
  characters, 
  disabled 
}) {
  return (
    <div className="character-strip">
      {characters.map(name => {
        const isFound = name in foundCharacters;
        const image = CHARACTERS.find(c => c.name === name)?.image;
        return (
          <button
            key={name}
            className={`
              character-button 
              ${isFound ? "found" : ""}
              ${disabled ? "disabled" : ""}
            `}
            disabled={isFound || disabled}
            onClick={() => onSelect(name)}
          >
            <img
              src={image}
              alt={name}
            />
          </button>
        );
      })}
    </div>
  );
}
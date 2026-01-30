const CHARACTERS = ["Wally", "Wilma", "Wizard"];

export default function CharacterMenu({ onSelect, foundCharacters }) {
  return (
    <ul className="character-menu">
      {CHARACTERS.map((name) => (
        <li 
          key={name}
          className={name in foundCharacters ? "found": ""} 
          onClick={() => onSelect(name)}
        >
          {name}
        </li>
      ))}
    </ul>
  );
}
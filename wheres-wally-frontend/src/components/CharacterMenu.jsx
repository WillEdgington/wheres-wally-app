const CHARACTERS = ["Wally", "Wilma", "Wizard"];

export default function CharacterMenu({ onSelect }) {
  return (
    <ul className="character-menu">
      {CHARACTERS.map((name) => (
        <li 
          key={name}
          onClick={() => onSelect(name)}
        >
          {name}
        </li>
      ))}
    </ul>
  );
}
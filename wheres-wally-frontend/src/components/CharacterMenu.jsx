export default function CharacterMenu({ onSelect, foundCharacters, characters }) {
  return (
    <ul className="character-menu">
      {characters.map((name) => (
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
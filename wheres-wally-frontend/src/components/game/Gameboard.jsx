import { useState, useRef } from "react";
import FoundMarker from "./FoundMarker";
import TargetMarker from "./TargetMarker";
import { SCENES } from "../../scenes";
import ZoomControls from "./ZoomControls";

export default function Gameboard({
  imageId, 
  target, 
  setTarget, 
  foundCharacters
}) {
  const [scale, setScale] = useState(1);
  const imgRef = useRef(null);

  const scene = SCENES.find(s => s.id === imageId)?.image;
  if (!scene) {
    return null;
  }

  function handleBoardClick(e) {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setTarget({ x, y });
  }

  return (
    <div
      className="game-board"
      onClick={handleBoardClick}
    >
      <ZoomControls 
        setScale={setScale}
      />
      <div
        className="zoom-layer"
        style={{ transform: `scale(${scale})` }}
      >
        <img 
          src={scene}
          ref={imgRef}
          alt="Find the Characters"
        />

        {target && <TargetMarker {...target} />}

        {Object.keys(foundCharacters).map((character) => (
          <FoundMarker
            key={character}
            character={character}
            data={foundCharacters[character]}
          />
        ))}
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import TargetBox from "./TargetBox"
import FoundMarker from "./FoundMarker";
import Timer from "./Timer";
import { SCENES } from "../scenes";
import { APIURL } from "../utils/config";

export default function Gameboard({ imageId, target, setTarget, onComplete }) {
  const [foundCharacters, setFoundCharacters] = useState({});
  const [sessionId, setSessionId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(null);
  const [characters, setCharacters] = useState([]);

  function handleBoardClick(e) {
    e.stopPropagation()
    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setTarget({ x, y });
  }

  async function handleCharacterSelect(characterName) {
    if (!target || foundCharacters[characterName]) return;

    const response = await fetch(`${APIURL}api/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image_id: imageId,
        character: characterName,
        x: target.x,
        y: target.y
      })
    });

    const data = await response.json();
    if (data.correct) {
      setFoundCharacters(prev => {
        if (prev[data.name]) return prev;

        return {
          ...prev,
          [data.name]: { x: data.x, y: data.y }
        };
      });
    }

    setTarget(null);
  }

  const scene = SCENES.find(s => s.id === imageId)?.image;
  if (!scene) {
    return null;
  }

  useEffect(() => {
    fetch(`${APIURL}api/images/${imageId}/characters`)
      .then(res => res.json())
      .then(data => setCharacters(data.map(c => c.name)));
  }, [imageId]);

  useEffect(() => {
    async function startSession() {
      const res = await fetch(`${APIURL}api/game_sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_id: imageId
        })
      });

      const data = await res.json();
      setSessionId(data.id);
      setStartTime(Date.now());
    }

    startSession();
  }, [imageId]);

  useEffect(() => {
    if (
      !sessionId ||
      characters.length === 0 ||
      Object.keys(foundCharacters).length !== characters.length
    ) {
      return;
    }

    fetch(`${APIURL}api/game_sessions/${sessionId}/complete`, {
      method: "PATCH",
    })
      .then(res => res.json())
      .then(data => {
        setDuration(data.duration);
        onComplete(data.duration, sessionId);
      });

  }, [foundCharacters, characters, sessionId]);

  return (
    <div
      className="game-board"
      onClick={handleBoardClick}
    >
      <Timer 
        startTime={startTime}
        duration={duration}
      />
      <img
        src={scene}
        alt="Find the characters"
      />

      {target && (
        <TargetBox
          x={target.x}
          y={target.y}
          onSelect={handleCharacterSelect}
          foundCharacters={foundCharacters}
          characters={characters}
        />
      )}

      {Object.keys(foundCharacters).map((character) => (
        <FoundMarker
          character={character}
          data={foundCharacters[character]}
        />
      ))}
    </div>
  );
}
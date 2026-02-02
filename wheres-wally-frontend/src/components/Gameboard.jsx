import { useEffect, useState } from "react";
import TargetBox from "./TargetBox"
import scene from "../assets/scene.jpg";
import FoundMarker from "./FoundMarker";
import Timer from "./Timer";

const APIURL = "http://localhost:3000/"
const CHARACTERS = ["Wally", "Wilma", "Wizard"];

export default function Gameboard({ target, setTarget }) {
  const [foundCharacters, setFoundCharacters] = useState({});
  const [sessionId, setSessionId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(null);

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
        image_id: 1,
        character: characterName,
        x: target.x,
        y: target.y
      })
    });

    const data = await response.json();
    if (data.correct) {
      setFoundCharacters(prev => {
        if (prev[data.name]) return prev;
        
        const next = {
          ...prev,
          [data.name]: { x: data.x, y: data.y }
        };

        if (
          sessionId &&
          Object.keys(next).length === CHARACTERS.length
        ) {
          fetch(`${APIURL}api/game_sessions/${sessionId}/complete`, {
            method: "PATCH"
          })
            .then(res => res.json())
            .then(data => setDuration(data.duration));
        }

        return next
      });
    }

    setTarget(null);
  }

  useEffect(() => {
    async function startSession() {
      const res = await fetch(`${APIURL}api/game_sessions`, {
        method: "POST"
      });
      const data = await res.json();
      setSessionId(data.id);
      setStartTime(Date.now());
    }

    startSession();
  }, []);

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
          characters={CHARACTERS}
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
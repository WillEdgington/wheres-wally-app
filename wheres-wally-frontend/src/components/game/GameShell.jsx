import { useEffect, useState } from "react";
import Toolbar from "./Toolbar";
import Gameboard from "./Gameboard";
import { APIURL } from "../../utils/config";

export default function GameShell({ imageId, onExit, onComplete }) {
  const [foundCharacters, setFoundCharacters] = useState({});
  const [target, setTarget] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(null);

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
    <div className="game-shell">
      <Toolbar 
        characters={characters}
        foundCharacters={foundCharacters}
        onCharacterClick={handleCharacterSelect}
        hasTarget={!!target}
        startTime={startTime}
        duration={duration}
        onExit={onExit}
      />
      <Gameboard 
        imageId={imageId}
        target={target}
        setTarget={setTarget}
        foundCharacters={foundCharacters}
      />
    </div>
  );
}
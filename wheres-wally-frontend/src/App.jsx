import { useState } from 'react';
import Gameboard from './components/Gameboard';
import SceneSelect from './components/SceneSelect';

export default function App() {
  const [target, setTarget] = useState(null);
  const [activeImageId, setActiveImageId] = useState(null);
  const [view, setView] = useState("menu");

  function handlePlay(imageId) {
    setActiveImageId(imageId);
    setView("game");
  }

  function handleBackToMenu() {
    setActiveImageId(null);
    setTarget(null);
    setView("menu");
  }

  return (
    <>
      {view === "menu" && (
        <SceneSelect onPlay={handlePlay} />
      )}

      {view === "game" && activeImageId && (
        <Gameboard 
          imageId={activeImageId}
          target={target}
          setTarget={setTarget}
          onExit={handleBackToMenu}
        />
      )}
    </>
  );
}

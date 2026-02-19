import { useState } from 'react';
import Gameboard from './components/Gameboard';
import SceneSelect from './components/SceneSelect';
import Leaderboard from './components/Leaderboard';

export default function App() {
  const [target, setTarget] = useState(null);
  const [activeImageId, setActiveImageId] = useState(null);
  const [view, setView] = useState("menu");

  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [leaderboardSceneId, setLeaderboardSceneId] = useState(null);
  const [leaderboardMode, setLeaderboardMode] = useState(null);
  const [completionTime, setCompletionTime] = useState(null);
  const [leaderboardSessionId, setLeaderboardSessionId] = useState(null);

  function handlePlay(imageId) {
    setLeaderboardOpen(false);
    setActiveImageId(imageId);
    setView("game");
  }

  function handleBackToMenu() {
    setLeaderboardOpen(false);
    setActiveImageId(null);
    setTarget(null);
    setView("menu");
  }

  function openPreview(sceneId) {
    setLeaderboardSceneId(sceneId);
    setLeaderboardMode("preview");
    setLeaderboardOpen(true);
  }

  function openCompletion(sceneId, time, sessionId) {
    setLeaderboardSceneId(sceneId);
    setCompletionTime(time);
    setLeaderboardSessionId(sessionId);
    setLeaderboardMode("complete");
    setLeaderboardOpen(true);
  }

  return (
    <>
      {view === "menu" && (
        <SceneSelect 
          onPlay={handlePlay} 
          onPreview={openPreview}
        />
      )}

      {view === "game" && activeImageId && (
        <Gameboard 
          imageId={activeImageId}
          target={target}
          setTarget={setTarget}
          onExit={handleBackToMenu}
          onComplete={(time, sessionId) => openCompletion(activeImageId, time, sessionId)}
        />
      )}

      <Leaderboard 
        open={leaderboardOpen}
        mode={leaderboardMode}
        sceneId={leaderboardSceneId}
        gameSessionId={leaderboardSessionId}
        time={completionTime}
        onClose={handleBackToMenu}
        onPlay={() => handlePlay(leaderboardSceneId)}
      />
    </>
  );
}

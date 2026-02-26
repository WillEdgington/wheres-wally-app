import { useState, useEffect } from 'react';
import SceneSelect from './components/menu/SceneSelect';
import Leaderboard from './components/Leaderboard';
import { APIURL } from './utils/config';
import GameShell from './components/game/GameShell';

export default function App() {
  const [target, setTarget] = useState(null);
  const [activeImageId, setActiveImageId] = useState(null);
  const [view, setView] = useState("menu");

  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [leaderboardSceneId, setLeaderboardSceneId] = useState(null);
  const [leaderboardMode, setLeaderboardMode] = useState(null);
  const [completionTime, setCompletionTime] = useState(null);
  const [leaderboardSessionId, setLeaderboardSessionId] = useState(null);

  const [scenes, setScenes] = useState([]);

  useEffect(() => {
    fetch(`${APIURL}api/images`)
      .then(res => res.json())
      .then(data => setScenes(data));
  }, []);

  function getNextSceneId() {
    if (!scenes.length) return null;

    const index = scenes.findIndex(s => s.id === activeImageId);
    if (index === -1) return null;

    const nextIndex = (index + 1) % scenes.length;
    return scenes[nextIndex]?.id ?? null;
  }

  function handlePlay(imageId) {
    if (imageId === null) return null;
    setLeaderboardOpen(false);
    setLeaderboardMode(null);
    setCompletionTime(null);
    setLeaderboardSceneId(null);
    setLeaderboardSessionId(null);

    setActiveImageId(imageId);
    setTarget(null);
    setView("game");
  }

  function handleBackToMenu() {
    setLeaderboardOpen(false);
    setLeaderboardMode(null);
    setCompletionTime(null);
    setLeaderboardSceneId(null);
    setLeaderboardSessionId(null);

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
          scenes={scenes}
          onPlay={handlePlay}
          onPreview={openPreview}
        />
      )}

      {view === "game" && activeImageId && (
        <GameShell 
          key={activeImageId}
          imageId={activeImageId}
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
        onPlay={
          leaderboardMode === "complete" 
          ? () => handlePlay(getNextSceneId())
          : () => handlePlay(leaderboardSceneId)
        }
      />
    </>
  );
}
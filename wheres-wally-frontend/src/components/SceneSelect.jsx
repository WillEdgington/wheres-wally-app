import { useEffect, useState } from "react";
import { SCENES } from "../scenes";

const APIURL = "http://localhost:3000/";

export default function SceneSelect({ onPlay }) {
  const [scenes, setScenes] = useState([]);
  
  useEffect(() => {
    fetch(`${APIURL}api/images`)
      .then(res => res.json())
      .then(images => {
        const merged = images.map(img => {
            const local = SCENES.find(s => s.id === img.id);
            return local
              ? { ...img, image: local.image }
              : null;
        }).filter(Boolean);

        setScenes(merged);
      });
  }, []);

  return (
    <>
      <div className="scene-header">
        <h1>Where’s Wally?</h1>
        <p>Select a scene to begin</p>
      </div>

      <div className="scene-grid">
        {scenes.map(scene => (
          <div key={scene.id} className="scene-card">
            <img src={scene.image} alt={scene.title} />
            <h3>{scene.title}</h3>
            <button onClick={() => onPlay(scene.id)}>Play</button>
          </div>
        ))}
      </div>
    </>
  );
}
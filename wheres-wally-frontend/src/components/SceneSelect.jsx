import { useEffect, useState, useRef } from "react";
import { SCENES } from "../scenes";
import Scrollbar from "./Scrollbar";
import { APIURL } from "../utils/config";

export default function SceneSelect({ onPlay, onPreview }) {
  const [scenes, setScenes] = useState([]);
  const gridRef = useRef(null);
  
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

      <div className="scene-carousel">
        <div ref={gridRef} className="scene-grid">
          {scenes.map(scene => (
            <div 
              key={scene.id} 
              className="scene-card"
              onClick={() => onPreview(scene.id)}
            >
              <img src={scene.image} alt={scene.title} />
              <h3>{scene.title}</h3>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onPlay(scene.id);
                }}
              >
                Play
              </button>
            </div>
          ))}
        </div>

        <Scrollbar 
          elemRef={gridRef}
          elemName={"carousel"}
        />
      </div>
    </>
  );
}
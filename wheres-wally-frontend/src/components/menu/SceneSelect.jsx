import { useEffect, useState, useRef } from "react";
import { SCENES } from "../../scenes";
import Scrollbar from "./Scrollbar";

export default function SceneSelect({ scenes, onPlay, onPreview }) {
  const gridRef = useRef(null);

  return (
    <div className="scene-menu">
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
              <img 
                src={SCENES.find(s => s.id === scene.id)?.image} 
                alt={scene.title} 
              />
              <h3>{scene.title}</h3>
              <button
                className="play-button"
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
    </div>
  );
}
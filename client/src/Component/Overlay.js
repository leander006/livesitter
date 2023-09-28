// Overlay.js
import React from "react";

const Overlay = ({ overlays, openEditor }) => {
  return (
    <div className="overlay-container mb-[20px]">
      {overlays.map((overlay, index) => (
        <div
          key={index}
          className="overlay md:text-2xl text-sm cursor-pointer  absolute p-2"
          draggable="true"
          style={{
            color: overlay.color,
            top: `${overlay.top}px`,
            left: `${overlay.left}%`,
            fontWeight: "bolder",
          }}
          onClick={() => openEditor(overlay)}
        >
          {overlay.content}
        </div>
      ))}
    </div>
  );
};

export default Overlay;

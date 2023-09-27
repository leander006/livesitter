// Overlay.js
import React, { useState } from "react";

const Overlay = ({ overlays, openEditor }) => {
  return (
    <div className="overlay-container space-y-2">
      {overlays.map((overlay, index) => (
        <div
          key={index}
          className="overlay cursor-pointer py-2 absolute p-2"
          draggable="true"
          style={{
            color: overlay.color,
            top: `${overlay.top}%`,
            left: `${overlay.left}%`,
            fontWeight: "bolder",
            fontSize: `${20}px`,
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

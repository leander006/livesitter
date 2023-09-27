// Overlay.js
import React, { useState } from "react";

const Overlay = ({ overlays, onOverlayMove }) => {
  const [newLeft, setnewLeft] = useState(null);
  const [newTop, setNewTop] = useState(null);

  return (
    <div className="overlay-container">
      {overlays.map((overlay, index) => (
        <div
          key={index}
          className="overlay cursor-pointer py-2 absolute p-2"
          draggable="true"
          onDrag={(e) => {
            setNewTop(e.clientY);
            setnewLeft(e.clientX);
            onOverlayMove(overlay, newLeft, newTop);
          }}
          style={{
            color: overlay.color,
            top: `${overlay.top}px`,
            left: `${overlay.left}px`,
            fontWeight: "bolder",
            fontSize: `${23}px`,
          }}
        >
          {overlay.content}
        </div>
      ))}
    </div>
  );
};

export default Overlay;

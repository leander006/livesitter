import React, { useState } from "react";
import Overlay from "./Overlay";

const VideoPlayer = ({ rtspUrl }) => {
  const [overlays, setOverlays] = useState([
    // Example initial overlays
    {
      color: "rgb(0,0,128) ",
      top: 250,
      left: 250,
      width: 200,
      content: "Overlay 1😍 😍",
      size: "23",
    },
  ]);

  const handleOverlayMove = (overlay, newLeft, newTop) => {
    const overlayIndex = overlays.findIndex((o) => o === overlay);

    if (overlayIndex !== -1) {
      const updatedOverlays = [...overlays];
      updatedOverlays[overlayIndex] = {
        ...overlay,
        left: newLeft,
        top: newTop,
      };
      setOverlays(updatedOverlays);
    }
  };
  return (
    <div className="relative">
      <div>
        <iframe width="640" height="480" src={rtspUrl} loading="lazy"></iframe>
      </div>
      <Overlay overlays={overlays} onOverlayMove={handleOverlayMove} />
    </div>
  );
};

export default VideoPlayer;

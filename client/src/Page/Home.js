import React from "react";

import VideoPlayer from "../Component/VideoPlayer";

function Home({ socket }) {
  const rtspUrl = "https://rtsp.me/embed/EtKGh5BY/";

  return (
    <div className="flex justify-center flex-col items-center">
      <h1>Live Stream with Overlays</h1>
      <VideoPlayer socket={socket} rtspUrl={rtspUrl} />
    </div>
  );
}

export default Home;

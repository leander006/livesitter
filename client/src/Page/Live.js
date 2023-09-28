import React from "react";
import Navbar from "../Component/Navbar";
import VideoPlayer from "../Component/VideoPlayer";
import { rtspUrl } from "../utils/helper";

function Live({ socket }) {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center pt-16">
        <VideoPlayer socket={socket} rtspUrl={rtspUrl} />
      </div>
    </div>
  );
}

export default Live;

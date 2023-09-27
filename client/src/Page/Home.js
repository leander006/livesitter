import React, { useState } from "react";
import Navbar from "../Component/Navbar";

import VideoPlayer from "../Component/VideoPlayer";

function Home({ socket }) {
  const [url, setUrl] = useState("");
  const [rtspUrl, setrtspUrl] = useState("https://rtsp.me/embed/EtKGh5BY/");

  return (
    <div className="w-screen">
      <Navbar />
      <div className="flex justify-center items-center pt-16">
        {!rtspUrl ? (
          <div className="bg-white flex justify-center items-center h-56 md:w-[420px] w-[200px]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setrtspUrl(url);
              }}
              className=" flex flex-col justify-center items-center space-y-4"
            >
              <h1>Enter rtsp url</h1>
              <input
                className="border p-2 rounded-xl"
                placeholder="Enter rtsp url"
                type="text"
                onChange={(e) => setUrl(e.target.value)}
              />
              <input type="submit" value="Submit" />
            </form>
          </div>
        ) : (
          <VideoPlayer socket={socket} rtspUrl={rtspUrl} />
        )}
      </div>
    </div>
  );
}

export default Home;

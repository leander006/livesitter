import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Component/Navbar";

import VideoPlayer from "../Component/VideoPlayer";

function Home({ socket }) {
  const [url, setUrl] = useState("");
  const [rtspUrl, setrtspUrl] = useState("");

  return (
    <div className="w-screen ">
      <Navbar />
      <div className="flex justify-center items-center pt-16">
        {!rtspUrl ? (
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center h-56 md:w-[420px] w-[96vw]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setrtspUrl(url);
              }}
              className=" flex flex-col justify-center items-center space-y-4"
            >
              <h1 className="text-white">Enter rtsp url to veiw live stream</h1>
              <input
                className="border p-1 w-full rounded-sm"
                placeholder="Enter rtsp url"
                type="text"
                onChange={(e) => setUrl(e.target.value)}
              />
              <input
                className="w-full cursor-pointer py-2 my-4 bg-black text-white"
                type="submit"
                value="Submit"
              />
            </form>
          </div>
        ) : (
          <VideoPlayer socket={socket} rtspUrl={rtspUrl} />
        )}
      </div>

      <div className="flex justify-center mt-3 text-white">
        <Link
          to="/live"
          className="w-fit bg-gradient-to-r p-2 cursor-pointer rounded-md from-indigo-500 via-purple-500 to-pink-500"
        >
          Click here to watch active live streams
        </Link>
      </div>
    </div>
  );
}

export default Home;

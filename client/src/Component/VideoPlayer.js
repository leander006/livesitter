import React, { useEffect, useState } from "react";
import Overlay from "./Overlay";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/helper";
import axios from "axios";
import toast from "react-hot-toast";
import { SpinnerCircular } from "spinners-react";
const Color = require("color");

const VideoPlayer = ({ rtspUrl, socket }) => {
  const [content, setContent] = useState("");
  const [editor, openEditor] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [left, setLeft] = useState("");
  const [top, setTop] = useState("");
  const [color, setColor] = useState("");
  const [data, setData] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage?.getItem("token")}`,
    },
  };

  const [overlays, setOverlays] = useState([]);
  useEffect(() => {
    const getOverlays = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/overlay?url=${rtspUrl}`,
          config
        );

        setOverlays(data.data);
      } catch (error) {
        if (error.response.data.message === "Unauthorized access no token") {
          toast.error("Please login again token expired");
        }
      }
    };
    getOverlays();
    // eslint-disable-next-line
  }, [data]);

  function colorNameToHex(colorNameInput) {
    try {
      const colorHex = Color(colorNameInput.toLowerCase()).hex();
      return colorHex;
    } catch (error) {
      return "Not_Valid";
    }
  }
  useEffect(() => {
    socket.emit("setup", currentUser);
    socket.on("get", () => setData(!data));
  });

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const newLeft = parseFloat(left);
      const newTop = parseFloat(top);
      const col = colorNameToHex(color);
      if (color !== "" && col === "Not_Valid") {
        return toast.error("Invalid color name");
      }
      if ((newLeft || newTop) && (newLeft > 70 || newTop > 240)) {
        return toast.error(
          "Invalid position. Please make sure left value is less then 70 and top value is less then 240px"
        );
      }

      await axios.put(
        `${BASE_URL}/api/overlay/${editor._id}`,
        {
          left: newLeft,
          content,
          top: newTop,
          color: color ? col : editor.color,
          url: rtspUrl,
        },
        config
      );
      setColor("");
      setContent("");
      setLeft("");
      setTop("");
      socket.emit("send");
    } catch (error) {
      if (error.response.data.message === "Unauthorized access no token") {
        toast.error("Please login again token expired");
      }
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const iframe = document.querySelector("iframe");
      const iframeWidth = iframe.clientWidth;

      const defaultLeftPercentage = (25 / iframeWidth) * 100;
      const defaultTopPercentage = (25 / iframeWidth) * 100;
      const col = colorNameToHex(color);
      if (col === "Not_Valid") {
        return toast.error("Invalid color name");
      }
      await axios.post(
        `${BASE_URL}/api/overlay`,
        {
          url: rtspUrl,
          content,
          left: `${defaultLeftPercentage}`,
          top: `${defaultTopPercentage}`,
          color: col,
        },
        config
      );
      setColor("");
      setContent("");
      socket.emit("send");
    } catch (error) {
      if (error.response.data.message === "Unauthorized access no token") {
        toast.error("Please login again token expired");
      }
    }
  };

  const handleDelete = async (e) => {
    try {
      e.preventDefault();
      await axios.delete(`${BASE_URL}/api/overlay/${editor._id}`, config);
      openEditor(false);
      socket.emit("send");
    } catch (error) {
      if (error.message === "Unauthorized access no token") {
        toast.error("Please login again token expired");
      }
    }
  };
  return (
    <div className="relative">
      <div className="md:w-[100%] md:h-[300px] w-[99%] h-[300px] mx-auto">
        {/* {!isIframeLoaded ? (
          <SpinnerCircular
            size="90"
            className="w-full flex items-center xl:h-80  md:h-64 h-28 lg:h-72 flex-col  mx-auto"
            thickness="100"
            speed="600"
            color="white"
            secondaryColor="black"
          />
        ) : ( */}
        <iframe
          title="live streaming"
          className="w-full h-full"
          src={rtspUrl}
          loading="lazy"
          onLoad={() => setIsIframeLoaded(true)}
          onAbort={() => setIsIframeLoaded(false)}
        ></iframe>
        {/* )} */}
      </div>
      {isIframeLoaded && (
        <Overlay overlays={overlays} openEditor={openEditor} editor={editor} />
      )}
      <div className="flex justify-center">
        {!editor ? (
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col justify-center items-center space-y-2 mt-3 p-2 bg-gradient-to-r w-[240px] md:w-[500px] from-indigo-500 via-purple-500 to-pink-500"
          >
            <h1 className="text-white">Enter overlay deatails</h1>
            <div className="flex flex-col md:flex-row md:justify-around items-center w-full space-y-2 md:space-y-0">
              <input
                className="border p-1 rounded-md w-fit"
                placeholder="Content"
                type="text"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                required
              />
              <input
                className="border p-1 rounded-md w-fit"
                placeholder="color"
                type="text"
                onChange={(e) => setColor(e.target.value)}
                value={color}
                required
              />
            </div>

            <input
              className="flex justify-start cursor-pointer border bg-white text-black rounded-md p-1 "
              type="submit"
              value="Add overlay"
            />
          </form>
        ) : (
          <form
            onSubmit={handleUpdate}
            className=" flex flex-col justify-center items-center space-y-2 mt-3 p-2 bg-gradient-to-r w-[240px] md:w-[500px] from-indigo-500 via-purple-500 to-pink-500"
          >
            <div className="grid text-white grid-flow-col col-span-3 w-full">
              <h1>{}</h1>
              <h1 className="text-center">{editor?.content}</h1>
              <div className="flex items-center">
                <i
                  onClick={handleDelete}
                  className="flex cursor-pointer fa-xl items-center text-center justify-end fa-solid fa-trash w-full"
                ></i>
                <i
                  onClick={() => openEditor(false)}
                  className="fa-solid fa-2xl ml-2 fa-xmark"
                ></i>
              </div>
            </div>

            <div className="flex flex-col md:justify-around items-center w-full space-y-2 md:space-y-2">
              <div className="flex justify-around flex-col md:flex-row w-full space-y-2 md:space-y-2">
                <div>
                  <h1 className="flex justify-center text-white my-1">
                    Content
                  </h1>
                  <input
                    className="border p-1 rounded-md md:w-fit"
                    placeholder={`${editor.content}`}
                    type="text"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                  />
                </div>

                <div>
                  <h1 className="flex justify-center text-white my-1">
                    Colour
                  </h1>
                  <input
                    className="border p-1 rounded-md md:w-fit"
                    placeholder={`${editor.color}`}
                    type="text"
                    onChange={(e) => setColor(e.target.value)}
                    value={color}
                  />
                </div>
              </div>
              <div className="flex justify-around w-full flex-col md:flex-row space-y-2 md:space-y-2">
                <div>
                  <h1 className="flex justify-center text-white my-1">
                    Left %
                  </h1>
                  <input
                    className="border p-1 rounded-md md:w-fit"
                    placeholder={`${editor.left}`}
                    type="text"
                    onChange={(e) => setLeft(e.target.value)}
                    value={left}
                  />
                </div>
                <div>
                  <h1 className="flex justify-center text-white my-1">Top %</h1>
                  <input
                    className="border p-1 rounded-md md:w-fit"
                    placeholder={`${editor.top}`}
                    type="text"
                    onChange={(e) => setTop(e.target.value)}
                    value={top}
                  />
                </div>
              </div>
            </div>
            <input
              className="flex justify-start cursor-pointer border bg-white text-black rounded-md p-1 "
              type="submit"
              value="Updated overlay"
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;

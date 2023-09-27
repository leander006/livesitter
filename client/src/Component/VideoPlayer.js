import React, { useEffect, useState } from "react";
import Overlay from "./Overlay";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/helper";
import axios from "axios";
const Color = require("color");
const VideoPlayer = ({ rtspUrl, socket }) => {
  const [overlayLeft, setOverlayLeft] = useState(""); // State to store left position
  const [overlayTop, setOverlayTop] = useState("");
  const [content, setContent] = useState("");
  const [editor, openEditor] = useState(false);
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
        console.log(error);
      }
    };
    getOverlays();
  }, [data]);

  function colorNameToHex(colorNameInput) {
    try {
      const colorHex = Color(colorNameInput.toLowerCase()).hex();
      return colorHex;
    } catch (error) {
      console.log(error);
      alert("Invalid color name");
      return "Invalid color name";
    }
  }
  useEffect(() => {
    socket.emit("setup", currentUser);
    socket.on("get", () => setData(!data));
  });

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();

      // Get the iframe's width and height
      const iframeWidth = 640;
      const iframeHeight = 300; // You can adjust this as needed

      // Convert the input values to numbers (assuming they are strings)
      const newLeft = parseFloat(left);
      const newTop = parseFloat(top);

      // Check if the new position is within the iframe boundaries
      if (
        !isNaN(newLeft) &&
        !isNaN(newTop) &&
        newLeft >= 0 &&
        newLeft + 2 <= iframeWidth && // Assuming the overlay width is 32 (you can adjust this)
        newTop >= 0 &&
        newTop + 2 <= iframeHeight // Assuming the overlay height is 32 (you can adjust this)
      ) {
        const { data } = await axios.put(
          `${BASE_URL}/api/overlay/${editor._id}`,
          {
            left: newLeft,
            content,
            top: newTop,
            color: color ? colorNameToHex(color) : editor.color,
            url: rtspUrl,
          },
          config
        );
        setColor("");
        setContent("");
        setLeft("");
        setTop("");
        socket.emit("send");
      } else {
        // Alert the user that the position is outside the boundaries
        alert(
          "Invalid position. Please make sure it's within the iframe boundaries."
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Get the iframe's width
      const iframe = document.querySelector("iframe");
      const iframeWidth = iframe.clientWidth; // Get the current width of the iframe

      // Calculate the default percentage values for left and top based on iframe width
      const defaultLeftPercentage = (25 / iframeWidth) * 100;
      const defaultTopPercentage = (25 / iframeWidth) * 100;

      const { data } = await axios.post(
        `${BASE_URL}/api/overlay`,
        {
          url: rtspUrl,
          content,
          left: `${defaultLeftPercentage}%`, // Set left as a percentage
          top: `${defaultTopPercentage}%`, // Set top as a percentage
          color: colorNameToHex(color),
        },
        config
      );
      setColor("");
      setContent("");
      socket.emit("send");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <div className="md:w-[90%] md:h-[300px] w-11/12 h-[200px] mx-auto">
        <iframe className="w-full h-full" src={rtspUrl} loading="lazy"></iframe>
      </div>
      <Overlay overlays={overlays} openEditor={openEditor} editor={editor} />
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
              />
              <input
                className="border p-1 rounded-md w-fit"
                placeholder="color"
                type="text"
                onChange={(e) => setColor(e.target.value)}
                value={color}
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
              <h1></h1>
              <h1 className="text-center">{editor?.content}</h1>
              <i
                onClick={() => openEditor(false)}
                className="flex cursor-pointer fa-xl items-center text-center justify-end fa-solid fa-xmark w-full"
              ></i>
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
                    placeholder={`${overlayLeft}`}
                    type="text"
                    onChange={(e) => setLeft(e.target.value)}
                    value={left}
                  />
                </div>
                <div>
                  <h1 className="flex justify-center text-white my-1">
                    Right %
                  </h1>
                  <input
                    className="border p-1 rounded-md md:w-fit"
                    placeholder={`${overlayTop}`}
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

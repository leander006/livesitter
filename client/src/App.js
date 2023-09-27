// App.js
import React from "react";
import { io } from "socket.io-client";
import { Route, Routes } from "react-router-dom";
import Home from "./Page/Home";

const Endpoint = "http://localhost:3003/";

function App() {
  const socket = io(Endpoint);
  return (
    <Routes>
      <Route path="/" element={<Home socket={socket} />} />
    </Routes>
  );
}

export default App;

// App.js
import React from "react";
import { io } from "socket.io-client";
import { Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
import Login from "./Page/Login";
import Signin from "./Page/Signin";
import Setting from "./Page/Setting";
import { BASE_URL } from "./utils/helper";
import { useSelector } from "react-redux";
const Endpoint = `${BASE_URL}/`;

function App() {
  const socket = io(Endpoint);
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Routes>
      <Route
        path="/"
        element={currentUser ? <Home socket={socket} /> : <Login />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/sign" element={<Signin />} />
      <Route path="/setting" element={currentUser ? <Setting /> : <Login />} />
    </Routes>
  );
}

export default App;

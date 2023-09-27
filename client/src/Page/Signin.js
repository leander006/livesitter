import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/login.jpg";
import axios from "axios";
import { BASE_URL } from "../utils/helper";
function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/api/auth/register`, {
        username: username,
        password: password,
        email: email,
      });
      navigate("/login");
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };
  return (
    <div className="w-full h-screen flex bg-[#001F3F]">
      <div className="grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]">
        <div className="w-full h-[550px] hidden md:block">
          <img className="w-full h-full" src={loginImg} alt="/" />
        </div>
        <div className="p-4 flex flex-col justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-3">
              <input
                className="border p-2"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="border p-2"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="border p-2"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <input
              type="submit"
              className="w-full cursor-pointer py-2 my-4 bg-black text-white"
              value="Register"
            />
          </form>
          <Link to="/login">
            <p className="text-center cursor-pointer">Login Up</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;

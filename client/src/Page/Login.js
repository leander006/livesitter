import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/login.jpg";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/helper";
import { loginError, loginStart, loginSuccess } from "../redux/Slice/userSlice";
import axios from "axios";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const { data } = await axios.post(`${BASE_URL}/api/auth/login`, {
        username: username,
        password: password,
      });
      dispatch(loginSuccess(data.user));
      localStorage.setItem("data", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      dispatch(loginError());
      console.log(err?.response?.data?.message);
    }
  };
  return (
    <div className="w-full h-screen flex bg-[#001F3F]">
      <div className="grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]">
        <div className="w-full h-[550px] hidden md:block">
          <img className="w-full h-full" src={loginImg} alt="/" />
        </div>
        <div className="p-2 w-[96vw] md:w-full flex flex-col justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <form className="p-4" onSubmit={handleSubmit}>
            <h2 className="text-4xl font-bold text-center mb-8">Welcome</h2>
            <div className="flex justify-between flex-col space-y-2 lg:flex-row lg:space-y-0">
              <input
                className="border p-2 "
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
            </div>
            <input
              type="submit"
              className="w-full cursor-pointer py-2 my-4 bg-black text-white"
              value="login"
            />
          </form>
          <Link to="/sign">
            <p className="text-center cursor-pointer">Sign Up</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

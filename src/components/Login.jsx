import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("User signed in");
      console.log("User signed in");
      navigate("/profile");
    } catch (error) {
      alert("Error signin in: ", error);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-300 flex items-center justify-center">
        <form
          className="bg-white shadow-sm shadow-black p-6 rounded"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-inter font-semibold text-center text-gray-700 mb-4">
            Login
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold font-inter mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:border-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold font-inter">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:border-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="flex justify-center items-center gap-2 w-full bg-gradient-to-tr from-black to-gray-500 text-white font-inter py-2 rounded-lg"
          >
            Login
          </button>

          <div className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-gray-600 font-semibold">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

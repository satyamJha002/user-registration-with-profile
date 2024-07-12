import React from "react";
import RegisterForm from "./components/RegisterForm";
import Profile from "./components/Profile";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;

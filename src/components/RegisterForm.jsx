import React, { useState } from "react";
import { BsGoogle, BsGithub, BsArrowRightSquareFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "../Validation";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate(formData);
    if (Object.keys(validationError).length > 0) {
      setError(validationError);
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          firstName: formData.firstName,
          lastName: formData.lastName,
          userName: formData.userName,
          email: formData.email,
          phone: formData.phone,
        });
        alert("User signed up and data stored in Firestore");
        navigate("/");
      } catch (error) {
        console.error("Error register profile", error);
        alert("Failed to save profile");
      }
    }
  };

  return (
    <div className="min-h-screen md:min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-black rounded-full"></div>
          </div>
        </div>
        <h2 className="text-2xl font-inter font-semibold text-center text-gray-700 mb-4">
          Create your account
        </h2>
        <p className="text-center font-inter text-gray-600 mb-6">
          Welcome! Please fill in the details to get started.
        </p>
        <div className="flex justify-between mb-4">
          <button className="w-full mr-4 shadow-sm shadow-slate-700 text-gray-600 py-2 rounded-lg flex items-center justify-center gap-2">
            <BsGoogle />
            Google
          </button>
          <button className="w-full ml-2 shadow-sm shadow-slate-700 text-gray-600 py-2 rounded-lg flex items-center justify-center gap-2">
            <BsGithub />
            GitHub
          </button>
        </div>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <div className="mx-4 text-gray-500">or</div>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-between gap-4 md:gap-10 md:flex-row">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold font-inter">
                First name
              </label>

              <input
                id="firstName"
                name="firstName"
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                value={formData.firstName}
                onChange={handleInput}
              />
              {error.firstName && (
                <div className="text-red-600 text-sm font-semibold">
                  {error.firstName}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold font-inter">
                Last name
              </label>

              <input
                id="lastName"
                name="lastName"
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                value={formData.lastName}
                onChange={handleInput}
              />
              {error.lastName && (
                <div className="text-red-600 text-sm font-semibold">
                  {error.lastName}
                </div>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-inter font-semibold">
              Username
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.userName}
              onChange={handleInput}
            />
            {error.userName && (
              <div className="text-red-600 text-sm font-semibold">
                {error.userName}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-inter font-semibold text-gray-700 mb-2">
              Email address
            </label>
            <input
              id="email"
              name="email"
              value={formData.email}
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              onChange={handleInput}
            />
            {error.email && (
              <div className="text-red-600 text-sm font-semibold">
                {error.email}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-semibold font-inter text-gray-700 mb-2">
              Phone number
            </label>
            <div className="flex">
              <select className="border rounded-l-lg focus:outline-none focus:border-blue-500">
                <option>IND (+91)</option>
              </select>
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                type="text"
                className="w-full px-4 py-2 border rounded-r-lg focus:outline-none focus:border-blue-500"
                onChange={handleInput}
              />
            </div>
            {error.phone && (
              <div className="text-red-600 text-sm font-semibold">
                {error.phone}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-semibold font-inter text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              value={formData.password}
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              onChange={handleInput}
            />
            {error.password && (
              <div className="text-red-600 text-sm font-semibold">
                {error.password}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="flex justify-center items-center gap-2 w-full bg-gradient-to-tr from-black to-gray-500 text-white font-inter py-2 rounded-lg"
          >
            Continue
            <BsArrowRightSquareFill />
          </button>
        </form>
        <div className="my-5">
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-gray-600 font-semibold">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

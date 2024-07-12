import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Security } from "@mui/icons-material";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-md w-full max-w-3xl">
          <div className="flex">
            <div className="border-r-2 pr-7 px-4 pt-4 bg-gray-100">
              <div className="pb-4">
                <h1 className="text-2xl font-semibold font-inter">Account</h1>
                <p className="text-sm font-inter text-gray-700">
                  Manage your account info.
                </p>
              </div>
              <div className="flex items-center px-3 text-gray-500 hover:bg-gray-300 hover:text-black hover:px-3 hover:py-3 hover:rounded-md cursor-pointer">
                <span className="material-icons">
                  <AccountCircleIcon />
                </span>
                <span className="ml-2 font-medium font-inter">Profile</span>
              </div>
              <div className="mt-4 flex items-center px-3 text-gray-500 hover:bg-gray-300 hover:text-black hover:px-3 hover:py-3 hover:rounded-md cursor-pointer">
                <span className="material-icons">
                  <Security />
                </span>
                <span className="ml-2">Security</span>
              </div>
              <div className="mt-10">
                <button
                  onClick={handleLogout}
                  className="border px-2 py-1 shadow-sm rounded shadow-slate-700 font-semibold text-gray-600 hover:bg-gray-600 hover:text-white"
                >
                  Log out
                </button>
              </div>
            </div>

            <div className="flex w-3/4 pl-4">
              <div className="mb-6 mt-6">
                <h2 className="font-inter text-lg font-semibold">
                  Profile Details
                </h2>
                <div className="my-5">
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="flex items-center gap-20 mb-4">
                  <h3 className="text-sm font-semibold font-inter text-gray-700">
                    Profile
                  </h3>
                  <div className="flex items-center gap-2">
                    <img
                      src="/IMG_20240710_145519466.jpg"
                      alt="profile"
                      className="w-14 h-14 rounded-full"
                    />
                    <h2 className="text-md font-inter text-gray-500 font-medium">
                      {userData.firstName} {userData.lastName}
                    </h2>
                  </div>
                  <div className="ml-4">
                    <button className="text-sm text-gray-700 font-inter font-semibold">
                      Edit profile
                    </button>
                  </div>
                </div>
                <div className="my-5">
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="flex items-center gap-20 mb-4">
                  <h3 className="text-sm font-semibold font-inter text-gray-700">
                    Email addresses
                  </h3>
                  <div className="mt-2">
                    <div className="flex gap-3 justify-between items-center">
                      <span>{userData.email}</span>
                      <span className="text-xs shadow-md shadow-black bg-gray-200 py-1 px-2 rounded">
                        Primary
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span>example@personal.com</span>
                    </div>
                    <button className="mt-2 text-sm font-semibold font-inter text-gray-700">
                      + Add email address
                    </button>
                  </div>
                </div>
                <div className="my-5">
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="flex items-center gap-20 mb-4">
                  <h3 className="text-sm font-semibold font-inter text-gray-700">
                    Phone number
                  </h3>
                  <div className="mt-2">
                    <div className="flex gap-3 justify-between items-center">
                      <span>+91 {userData.phone}</span>
                      <span className="text-xs shadow-md shadow-black bg-gray-200 py-1 px-2 rounded">
                        Primary
                      </span>
                    </div>
                    <button className="mt-2 text-sm font-semibold font-inter text-gray-700">
                      + Add phone number
                    </button>
                  </div>
                </div>
                <div className="my-5">
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="flex gap-20 items-center mb-4">
                  <h3 className="text-sm text-gray-600text-sm font-semibold font-inter text-gray-700">
                    Connected accounts
                  </h3>
                  <div className="mt-2">
                    <div className="flex items-center gap-3">
                      <img
                        src="/icons8-google-48.png"
                        alt=""
                        className="w-5 "
                      />
                      <span>Google</span>
                      <span className="text-gray-500">{userData.email}</span>
                    </div>
                    <button className="mt-2 text-sm font-semibold font-inter text-gray-700">
                      + Connect account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

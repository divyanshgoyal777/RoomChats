import React, { useEffect } from "react";
import { auth, provider } from "../../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { FcGoogle } from "react-icons/fc";

const cookies = new Cookies();

const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Login | RoomChats";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center px-4">
      <div className="text-center space-y-8 p-6 md:p-10 max-w-lg mx-auto rounded-lg bg-white shadow-2xl transform hover:scale-105 transition-transform duration-500 ease-in-out">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 animate-pulse">
          Welcome to RoomChats!
        </h1>
        <p className="text-sm md:text-base text-gray-800">
          Experience the future of communication with RoomChats, your intuitive
          one-on-one chat app. Sign in to start connecting.
        </p>

        <div className="flex justify-center">
          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <FcGoogle className="mr-2" size={24} />
            Sign In with Google
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Why Choose RoomChats?
          </h2>
          <ul className="list-disc list-inside sm:pl-10 text-gray-700 space-y-2 text-left mx-auto max-w-lg">
            <li className="flex items-center">
              📂 Create unlimited rooms with saved chats
            </li>
            <li className="flex items-center">
              🚀 Fast and real-time messaging
            </li>
            <li className="flex items-center">
              🌐 Connect with anyone, anywhere
            </li>
          </ul>
        </div>

        <footer className="text-gray-600 mt-6">
          &copy; {new Date().getFullYear()} RoomChats. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Auth;

import React, { useRef, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";

const RoomSelection = ({ setRoom, signUserOut }) => {
  const roomInputRef = useRef(null);

  useEffect(() => {
    document.title = "Join a Room | RoomChats";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white p-6 animate-gradient">
      <h2 className="text-4xl md:text-5xl mb-6 font-bold text-center shadow-lg animate-slideIn">
        Join a Room
      </h2>
      <input
        ref={roomInputRef}
        className="mb-4 p-4 w-80 rounded-lg bg-gray-800 text-white border border-gray-600 outline-none text-center focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:scale-105 shadow-lg"
        placeholder="Room name"
      />
      <button
        onClick={() => setRoom(roomInputRef.current.value)}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-110 shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Join Room
      </button>
      <button
        onClick={signUserOut}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-110 shadow-xl flex items-center focus:outline-none focus:ring-4 focus:ring-red-300"
      >
        <FaSignOutAlt className="mr-2 text-lg" />
        Sign Out
      </button>
    </div>
  );
};

export default RoomSelection;

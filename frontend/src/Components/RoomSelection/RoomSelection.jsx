import React, { useRef, useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { FaSpinner } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const RoomSelection = ({ setRoom, signUserOut }) => {
  const roomInputRef = useRef(null);
  const roomCodeInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  useEffect(() => {
    document.title = "Room Selection | RoomChats";
  }, []);

  const handleRoomCreation = async () => {
    const roomName = roomInputRef.current.value.trim();
    if (!roomName) {
      toast.error("Room name is required!");
      return;
    }
    setLoading(true);
    const roomRef = doc(db, "rooms", roomName);
    const roomSnap = await getDoc(roomRef);

    if (!roomSnap.exists()) {
      const newRoomCode = Math.random().toString(36).substr(2, 6);
      await setDoc(roomRef, {
        name: roomName,
        code: newRoomCode,
        creator: auth.currentUser.uid,
      });
      setGeneratedCode(newRoomCode);
      toast.success("Room created! Share the code.");
    } else {
      toast.error("Room name already exists! Try another name.");
    }
    setLoading(false);
  };

  const handleRoomJoin = async () => {
    const roomName = roomInputRef.current.value.trim();
    const roomCode = roomCodeInputRef.current.value.trim();
    if (!roomName) {
      toast.error("Room name is required!");
      return;
    }
    if (!roomCode) {
      toast.error("Room code is required!");
      return;
    }
    setLoading(true);
    const roomRef = doc(db, "rooms", roomName);
    const roomSnap = await getDoc(roomRef);

    if (roomSnap.exists() && roomCode === roomSnap.data().code) {
      toast.success("Success! Joining room...");
      setTimeout(() => {
        setRoom(roomName);
      }, 1000);
    } else {
      toast.error("Invalid room name or code. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white p-6 animate-gradient">
      <Toaster />
      <h2 className="text-4xl md:text-5xl mb-6 font-bold text-center shadow-lg animate-slideIn">
        {isCreatingRoom ? "Create a New Room" : "Join a Room"}
      </h2>
      <input
        ref={roomInputRef}
        className="mb-4 p-4 w-80 rounded-lg bg-gray-800 text-white border border-gray-600 outline-none text-center focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:scale-105 shadow-lg"
        placeholder="Room name"
        disabled={loading}
      />
      {!isCreatingRoom && (
        <input
          ref={roomCodeInputRef}
          className="mb-4 p-4 w-80 rounded-lg bg-gray-800 text-white border border-gray-600 outline-none text-center focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:scale-105 shadow-lg"
          placeholder="Room code"
          disabled={loading}
        />
      )}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => setIsCreatingRoom(!isCreatingRoom)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-300 ease-in-out transform hover:scale-110 shadow-xl focus:outline-none focus:ring-4 focus:ring-yellow-300"
        >
          {isCreatingRoom ? "Join a Room" : "Create a New Room"}
        </button>
        <button
          onClick={isCreatingRoom ? handleRoomCreation : handleRoomJoin}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-110 shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <FaSpinner className="animate-spin text-xl" />
          ) : isCreatingRoom ? (
            "Create Room"
          ) : (
            "Join Room"
          )}
        </button>
      </div>
      {generatedCode && (
        <div className="mt-4 p-4 w-80 bg-gray-900 rounded-lg shadow-lg text-center">
          <h3 className="text-xl mb-2">Room Code:</h3>
          <p className="text-2xl font-bold">{generatedCode}</p>
          <small className="block text-gray-400 mt-2">
            Share this code with others to join the room.
          </small>
        </div>
      )}
      <button
        onClick={signUserOut}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-110 shadow-xl flex items-center"
      >
        <FaSignOutAlt className="mr-2 text-lg" />
        Sign Out
      </button>
    </div>
  );
};

export default RoomSelection;

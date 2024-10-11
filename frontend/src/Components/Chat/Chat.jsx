import React, { useEffect, useState, useRef } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import Cookies from "universal-cookie";
import { signOut } from "firebase/auth";
import { FiSend } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";
import "./chat.css";

const cookies = new Cookies();

const Chat = ({ room, setIsAuth, setRoom }) => {
  const [newMessage, setNewMessage] = useState("");
  const messageRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [isOwner, setIsOwner] = useState(false); 
  const [roomCode, setRoomCode] = useState("");

  useEffect(() => {
    const fetchRoomData = async () => {
      const roomRef = doc(db, "rooms", room);
      const roomSnap = await getDoc(roomRef);
      if (roomSnap.exists()) {
        const roomData = roomSnap.data();
        setRoomCode(roomData.code);
        console.log(roomData.creator);
        console.log(auth.currentUser.uid);
        console.log(roomData === auth.currentUser.uid);
        if (roomData.creator === auth.currentUser.uid) {
          setIsOwner(true);
        }
      }
    };
    fetchRoomData();
  }, [room]);

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.docs.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, [room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  useEffect(() => {
    document.title = room + " | RoomChats";
  }, []);

  return (
    <div className="relative flex flex-col h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
      <button
        onClick={signUserOut}
        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full flex items-center justify-center transition-all duration-300"
      >
        <FaSignOutAlt className="text-lg" />
      </button>
      <div className="text-center text-2xl font-bold mb-4">
        Room: <span className="text-blue-400">{room}</span>
      </div>

      {isOwner && (
        <div className="text-green-400 text-center mb-2">
          You are the owner of this room!
          <br />
          Room Code: <span className="font-semibold">{roomCode}</span>
        </div>
      )}

      <div className="flex-1 overflow-y-auto mb-4 p-2 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.user === auth.currentUser.displayName
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`p-3 m-1 rounded-lg max-w-xs md:max-w-sm lg:max-w-md text-sm shadow-md transition-transform duration-300 transform hover:scale-105 ${
                message.user === auth.currentUser.displayName
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-100"
              }`}
            >
              <div className="font-semibold mb-1">{message.user}</div>
              <div className="mb-1">{message.text}</div>
              <div className="text-xs text-gray-400">
                {new Date(
                  message.createdAt?.seconds * 1000
                ).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          className="flex-1 p-3 bg-gray-800 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 p-3 rounded-r-full hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
        >
          <FiSend className="text-xl" />
        </button>
      </form>
    </div>
  );
};

export default Chat;

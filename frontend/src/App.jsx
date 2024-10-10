import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "./Components/Authentication/Auth";
import Chat from "./Components/Chat/Chat";
import Cookies from "universal-cookie";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import RoomSelection from "./Components/RoomSelection/RoomSelection";

const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("");

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return <Auth setIsAuth={setIsAuth} />;
  }

  if (!room) {
    return <RoomSelection setRoom={setRoom} signUserOut={signUserOut} />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/chat"
          element={<Chat room={room} setRoom={setRoom} setIsAuth={setIsAuth} />}
        />
        <Route path="*" element={<Navigate to="/chat" />} />
      </Routes>
    </Router>
  );
};

export default App;

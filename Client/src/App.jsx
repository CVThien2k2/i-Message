import { useContext, useState } from "react";
import "./App.scss";
import GroupChat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Route, Routes, Navigate } from "react-router-dom";
import "@mantine/core/styles.css";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import { AuthContext } from "./context/Authcontext";
import { GroupContextProvider } from "./context/GroupContext";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <GroupContextProvider user={user}>
      <div id="root">
        <NavBar />
        <Routes>
          <Route path="/" element={user ? <GroupChat /> : <Login />} />
          <Route path="/login" element={user ? <GroupChat /> : <Login />} />
          <Route
            path="/register"
            element={user ? <GroupChat /> : <Register />}
          />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </GroupContextProvider>
  );
}

export default App;

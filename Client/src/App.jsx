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
import { ListFriend } from "./components/friend/ListFriend";
import { Stack } from "@mantine/core";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <GroupContextProvider user={user}>
      <Stack style={{ minHeight: "100vh" }}>
        <NavBar />
        <Routes>
          {" "}
          <Route path="/message" element={user ? <GroupChat /> : <Login />} />
          <Route path="/" element={user ? <GroupChat /> : <Login />} />
          <Route path="/login" element={user ? <GroupChat /> : <Login />} />
          <Route
            path="/register"
            element={user ? <GroupChat /> : <Register />}
          />
          <Route
            path="/friend"
            element={user ? <ListFriend /> : <Login />}
          ></Route>
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Stack>
    </GroupContextProvider>
  );
}

export default App;

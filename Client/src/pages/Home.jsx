import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

import ChatList from "../components/ChatList";
import Chat from "../components/Chat";
import SetAvatar from "../components/SetAvatar";
import SideBar from "../components/SideBar";

const Home = () => {
  // const navigate = useNavigate();
  // const [contact, setContact] = useState([]);
  // const [currentUser, setCurrentUser] = useState(undefined);
  // const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   const checkUser = async () => {
  //     if (!user) {
  //       navigate("/login");
  //     } else {
  //       setCurrentUser(await JSON.parse(user));
  //     }
  //   };

  //   checkUser();
  // }, [user, navigate]);

  // useEffect(() => {
  //   const fetchContactData = async () => {
  //     if (currentUser) {
  //       if (currentUser.isAvatarImageSet) {
  //         const data = await axios.get(`/api/allUsers/${currentUser._id}`);
  //         setContact(data.data);
  //       } else {
  //         navigate("/setAvatar");
  //       }
  //     }
  //   };

  //   fetchContactData();
  // }, [currentUser, navigate]);

  return (
    <div className="home">
      <Row className="container">
        <Col sm={1}>
          <SideBar />
        </Col>
        <Col sm={4}>
          <ChatList />
        </Col>
        <Col sm={7}>
          <Chat />
        </Col>
      </Row>
    </div>
  );
};

export default Home;

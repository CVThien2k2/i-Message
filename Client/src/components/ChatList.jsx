import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import SearchUser from "./SearchUser";
import Chats from "./Chats";
// import { Search } from "react-bootstrap-icons";
import OnlineUsers from "./OnlineUsers";

const ChatList = () => {
  return (
    <div className="chatlist">
      <SearchUser />
      <OnlineUsers />
      <Chats />
    </div>
  );
};

export default ChatList;

import React from "react";
import { CameraVideo, Telephone, Dot } from "react-bootstrap-icons";
import Messages from "./Messages";
import Input from "./Input";
import { Row, Col } from "react-bootstrap";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <div className="nameWithDot">
          <span className="name">Peter</span>
          <div>
            <Dot color="green" size={40} /> <span>Active now</span>
          </div>
        </div>
        <div className="chatIcons">
          <CameraVideo color="black" size={35} />
          <Telephone color="black" size={35} />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;

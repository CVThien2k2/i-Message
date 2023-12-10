import React from "react";
import {
  ChatRightText,
  Telephone,
  Person,
  Bell,
  Gear,
  BoxArrowInRight,
} from "react-bootstrap-icons";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="avt">
        <img
          className="img-avt"
          src="https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg"
          alt=""
        />
      </div>
      <div className="icons">
        <ChatRightText className="icon" />
        <Telephone className="icon" />
        <Person className="icon" />
        <Bell className="icon" />
      </div>
      <div className="settingIcon">
        <Gear size={20} className="setIcon" />
        <BoxArrowInRight size={20} className="setIcon" />
      </div>
    </div>
  );
};

export default SideBar;

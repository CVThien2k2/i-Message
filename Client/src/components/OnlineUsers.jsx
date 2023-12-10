import React from "react";
import { Dot } from "react-bootstrap-icons";

const OnlineUsers = () => {
  return (
    <div className="onlineUser">
      <div className="userAndDot">
        <img
          className="img-avt"
          src="https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg"
          alt=""
        />

        <Dot className="dot" color="green" size={40} />
      </div>
    </div>
  );
};

export default OnlineUsers;

// ToCalled.jsx
import Modal from "react-bootstrap/Modal";
import { IconMicrophone, IconPhoneCall, IconVideo } from "@tabler/icons-react";
import { useContext, useEffect, useRef, useState } from "react";
import { GroupContext } from "../context/GroupContext";

import { CloseButton, Group } from "@mantine/core";
import { CallContext } from "../context/CallContext";

const ReceiverVideo = () => {
  const { calling, endCalled, userVideo, myVideo } = useContext(CallContext);

  if (!calling) return null;

  return (
    <Modal show={true} backdrop="static" keyboard={false}>
      <CloseButton
        className="justify-end"
        onClick={() => {
          endCalled();
        }}
      />

      <video
        ref={myVideo}
        playsInline
        autoPlay
        style={{
          width: "150px", // Đặt kích thước cho video của bạn ở góc dưới cùng bên trái
          height: "120px",
          objectFit: "cover",
          position: "absolute",
          bottom: "20px",
          left: "20px",
          zIndex: 1,
          marginBottom: "50px",
          marginLeft: "10px",
          background: "white",
        }}
        muted
      ></video>
      <video
        ref={userVideo}
        playsInline
        autoPlay
        style={{
          width: "90%",
          height: "80vh",
          objectFit: "contain",
          background: "black",
          margin: "auto",
        }}
        muted
      ></video>
      <Group justify="center">
        <IconVideo
          variant="secondary"
          style={{ width: "30px", height: "30px", margin: "12px" }}
          color="black"
        ></IconVideo>
        <IconPhoneCall
          style={{ width: "30px", height: "30px", margin: "12px" }}
          color="black"
        ></IconPhoneCall>
        <IconMicrophone
          variant="secondary"
          style={{ width: "30px", height: "30px", margin: "12px" }}
          color="black"
        ></IconMicrophone>
      </Group>
    </Modal>
  );
};

export default ReceiverVideo;

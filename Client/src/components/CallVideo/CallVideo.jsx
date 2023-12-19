// ToCalled.jsx
import {
  IconMicrophone,
  IconMicrophoneOff,
  IconPhoneCall,
  IconVideo,
  IconVideoOff,
} from "@tabler/icons-react";
import { Peer } from "peerjs";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/Authcontext";
import { CallContext } from "../../context/CallContext";
const CallVideo = ({ socket }) => {
  const { user } = useContext(AuthContext);
  const { caller, isEnd, groupCurrent } = useContext(CallContext);
  const [peerId, setPeerId] = useState(null);
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const [stream, setStream] = useState(null);
  const remoteVideoRef = useRef();
  const currentUserVideo = useRef();
  const peerIns = useRef();
  const [isOpenVideo, setIsOpenVideo] = useState(true);
  const [isOpenMic, setIsOpenMic] = useState(true);

  useEffect(() => {
    socket.disconnect();
    const peer = new Peer();
    peer.on("open", (id) => {
      setPeerId(id);
    });
    peer.on("call", (call, stream) => {
      call.answer(currentUserVideo.current.srcObject);
      call.on("stream", (reamotestream) => {
        remoteVideoRef.current.srcObject = reamotestream;
        remoteVideoRef.current.play();
      });
    });
    peerIns.current = peer;
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        currentUserVideo.current.srcObject = stream;
      });
  }, []);
  console.log(socket);
  const call = (id) => {
    const call = peerIns.current.call(id, currentUserVideo.current.srcObject);
    currentUserVideo.current.play();
    call.on("stream", (reamotestream) => {
      remoteVideoRef.current.srcObject = reamotestream;
      remoteVideoRef.current.play();
    });
  };

  const changeOpenVideo = () => {
    setIsOpenVideo(!isOpenVideo);
  };
  const changeOpenMic = () => {
    setIsOpenMic(!isOpenMic);
  };
  return (
    <div
      style={{
        background: "black",
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          zIndex: 1,
        }}
      >
        <input
          type="text"
          value={remotePeerIdValue}
          onChange={(e) => {
            setRemotePeerIdValue(e.target.value);
          }}
          style={{
            padding: "8px",
            marginRight: "8px",
            fontSize: "16px",
          }}
        />
        <button
          onClick={() => {
            call(remotePeerIdValue);
          }}
          style={{
            padding: "8px",
            fontSize: "16px",
            background: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Call
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          background: "black",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ flex: 1, overflow: "hidden" }}>
          <video
            ref={remoteVideoRef}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              backgroundColor: "black",
              border: "1px solid white",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
              marginBottom: "30px",
            }}
          ></video>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            zIndex: 1,
          }}
        >
          {" "}
          {isOpenVideo ? (
            <IconVideo
              style={{
                width: "60px",
                height: "60px",
                margin: "0 20px 10px 20px",
              }}
              color="white"
              stroke={1.5}
              onClick={() => {
                changeOpenVideo();
              }}
            />
          ) : (
            <IconVideoOff
              style={{
                width: "60px",
                height: "60px",
                margin: "0 20px 10px 20px",
              }}
              color="white"
              stroke={1.5}
              onClick={() => {
                changeOpenVideo();
              }}
            />
          )}
          {isOpenMic ? (
            <IconMicrophone
              style={{
                width: "60px",
                height: "60px",
                margin: "0 20px 10px 20px",
              }}
              color="white"
              stroke={1.5}
              onClick={() => {
                changeOpenMic();
              }}
            />
          ) : (
            <IconMicrophoneOff
              style={{
                width: "60px",
                height: "60px",
                margin: "0 20px 10px 20px",
              }}
              color="white"
              stroke={1.5}
              onClick={() => {
                changeOpenMic();
              }}
            />
          )}
          <IconPhoneCall
            style={{
              width: "60px",
              height: "60px",
              margin: "0 20px 10px 20px",
            }}
            color="white"
            stroke={1.5}
          />
        </div>

        <video
          ref={currentUserVideo}
          muted
          autoPlay
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            width: "30%",
            maxWidth: "200px",
            background: "black",
            border: "1px solid white",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
          }}
        ></video>
      </div>
    </div>
  );
};

export default CallVideo;

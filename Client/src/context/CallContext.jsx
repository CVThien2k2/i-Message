import { createContext, useCallback, useEffect, useRef, useState } from "react";
export const CallContext = createContext();
import { Peer } from "peerjs";
export const CallContextProvider = ({ children, user, socket }) => {
  const [calling, SetCalling] = useState(false);
  const [receivingCall, setReceivingCall] = useState(false);
  const [groupCurrent, setGroupCurrent] = useState(null);
  const [caller, setCaller] = useState();
  useEffect(() => {
    if (socket === null) return;

    socket.on("call", (res) => {
      setGroupCurrent(res.group);
      setCaller(res.from);
      setReceivingCall(true);
    });
    socket.on("reject", (res) => {
      updateMakingCall();
    });
    socket.on("accept", (data) => {
      console.log("accept");
    });
    socket.on("end", (data) => {
      setCaller(null);
      setReceivingCall(false);
    });

    return () => {
      socket.off("call");
      socket.off("reject");
      socket.off("accept");
    };
  }, [socket]);

  const endCalled = useCallback(() => {
    SetCalling(false);
    socket.emit("end", caller);
    setCaller(null);
    setMakingCall(false);
    setReceivingCall(false);
  });

  const updateMakingCall = useCallback((u) => {
    setMakingCall(false);
    socket.emit("end", { ...u });
  });

  const callUser = useCallback(async (data) => {
    setGroupCurrent(data.currenChat);
    setCaller(data.recipientUser);
    SetCalling(true);
    socket.emit("call", { from: data.user, group: data.currenChat });
  });
  const rejectCall = useCallback(() => {
    socket.emit("reject", { to: caller, from: user });
    setCaller(null);
    setReceivingCall(false);
  });

  const acceptCall = useCallback(() => {
    setReceivingCall(false);
    SetCalling(true);
  });

  return (
    <CallContext.Provider
      value={{
        callUser,
        receivingCall,
        rejectCall,
        acceptCall,
        calling,
        endCalled,
        groupCurrent,
        caller,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

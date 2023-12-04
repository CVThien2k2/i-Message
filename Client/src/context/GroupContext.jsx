import { createContext, useCallback, useState, useEffect } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
export const GroupContext = createContext();
import { io } from "socket.io-client";

export const GroupContextProvider = ({ children, user }) => {
  const [userGroups, setUserGroups] = useState(null);
  const [isUserGroupLoading, setIsUserGroupLoading] = useState(false);
  const [userGroupError, setUserGroupError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currenChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  //init socket
  useEffect(() => {
    if (!user) return;
    const newSocket = io("http://localhost:8081");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [user]);
  //add online user
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);

    socket.on("getonlineUsers", (res) => {
      setOnlineUsers(res);
      console.log(res);
    });
  }, [socket]);

  //send message
  useEffect(() => {
    if (socket === null) return;
    const recipientId = currenChat?.members?.find((id) => id !== user?._id);
    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  //get message
  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res) => {
      console.log(messages);
      if (currenChat?._id !== res.group_id) return;
      setMessages((pre) => [...pre, res]);
    });

    return () => {
      socket.off("getMessage");
    };
  }, [socket, currenChat]);
  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/auth`);

      if (response.error) {
        return console.log("Error Fetching User", response);
      }

      const pChats = response.filter((u) => {
        if (user === null) {
          return false; // Không thêm vào pChats nếu user là null
        }
        let isChatCreated = false;
        if (user?._id === u._id) return false;

        if (userGroups) {
          isChatCreated = userGroups?.some((group) => {
            return group.members[0] === u._id || group.members[1] === u._id;
          });
        }
        return !isChatCreated;
      });
      setPotentialChats(pChats);
    };
    getUsers();
  }, [userGroups]);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("Tin nhắn trống");
      const response = await postRequest(
        `${baseUrl}/message`,
        JSON.stringify({
          text: textMessage,
          user_id: sender._id,
          group_id: currentChatId,
        })
      );
      if (response.error) {
        return setSendTextMessageError(response);
      }

      setNewMessage(response);
      setMessages((pre) => [...pre, response]);
      setTextMessage("");
    },
    []
  );

  const updateCurrenChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstID, secondID) => {
    const response = await postRequest(
      `${baseUrl}/group/`,
      JSON.stringify({
        firstID,
        secondID,
      })
    );
    if (response.error) {
      return console.log("Error Creating chat", response);
    }
    setUserGroups((pre) => [...pre, response]);
  }, []);
  useEffect(() => {
    const getUserGroups = async () => {
      setIsUserGroupLoading(true);

      if (user?._id) {
        const response = await getRequest(`${baseUrl}/group/${user?._id}`);
        setIsUserGroupLoading(false);
        if (response.error) {
          return setUserGroupError(response);
        }
        setUserGroups(response);
      }
    };
    getUserGroups();
  }, [user]);
  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      if (currenChat != null) {
        const response = await getRequest(
          `${baseUrl}/message/${currenChat?._id}`
        );
        setIsMessagesLoading(false);
        if (response.error) {
          return setMessagesError(response);
        }
        setMessages(response);
      }
    };
    getMessages();
  }, [currenChat]);

  return (
    <GroupContext.Provider
      value={{
        userGroups,
        setUserGroups,
        isUserGroupLoading,
        userGroupError,
        potentialChats,
        createChat,
        updateCurrenChat,
        messages,
        isMessagesLoading,
        messagesError,
        currenChat,
        sendTextMessage,
        setSendTextMessageError,
        onlineUsers,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

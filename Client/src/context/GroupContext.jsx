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
  const [notification, setNotification] = useState([]);
  const [allUser, setAllUser] = useState([]);
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
      if (currenChat?._id !== res.group_id) return;
      setMessages((pre) => [...pre, res]);
    });
    socket.on("getNotification", (res) => {
      const isChatOpen = currenChat?.members.some((id) => id === res.user_id);
      if (isChatOpen) {
        setNotification((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotification((prev) => [res, ...prev]);
      }
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
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
      setAllUser(response);
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
  //Xử lí thông báo
  const markAllNotification = useCallback((notification) => {
    const mNotification = notification.map((n) => {
      return { ...n, isRead: true };
    });
    setNotification(mNotification);
  });
  const markNotificationAsRead = useCallback(
    (n, userGroups, user, notification) => {
      //find to open chat
      const desiredChat = userGroups.find((chat) => {
        console.log(chat);
        const chatMembers = [user._id, n.user_id];
        const isDesiredChat = chat?.members.every((member) => {
          return chatMembers.includes(member);
        });
        return isDesiredChat;
      });
      //mark notification as read
      const mNotification = notification.map((el) => {
        if (n.user_id === el.user_id) {
          return {
            ...n,
            isRead: true,
          };
        } else {
          return el;
        }
      });
      updateCurrenChat(desiredChat);
      setNotification(mNotification);
    },
    []
  );
  const markThisUserNotificationAsRead = useCallback(
    (thisUserNotification, notification) => {
      //mark notification as read
      console.log(thisUserNotification);
      const mNotification = notification.map((el) => {
        let notify;
        thisUserNotification.forEach((n) => {
          if (n.user_id === el.user_id) {
            notify = { ...n, isRead: true };
          } else {
            notify = el;
          }
        });

        return notify;
      });
      setNotification(mNotification);
    },
    []
  );

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
        notification,
        allUser,
        markAllNotification,
        markNotificationAsRead,
        markThisUserNotificationAsRead,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

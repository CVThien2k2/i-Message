import { useFetchRecipient } from "../../hooks/useFetchRecipients";
import { Container, Stack } from "react-bootstrap";

import { useContext } from "react";
import { GroupContext } from "../../context/GroupContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import useFetchLastestMessage from "../../utils/useFetchLastestMessage";
import moment from "moment";
const UserChat = ({ group, user }) => {
  const { recipientUser } = useFetchRecipient(group, user);
  const {
    onlineUsers,
    notification,
    markThisUserNotificationAsRead,
    currenChat,
  } = useContext(GroupContext);
  const isOnline = onlineUsers.some((u) => u?.userId === recipientUser?._id);
  const unreadNotifications = unreadNotificationsFunc(notification);
  const { lastestMessage } = useFetchLastestMessage(group);
  const thisUserNotification = unreadNotifications?.filter((n) => {
    return n.user_id == recipientUser?._id;
  });
  const truncateText = (text) => {
    let shortText = text.substring(0, 20);
    if (text.length > 20) {
      shortText = shortText + "...";
    }
    return shortText;
  };

  return (
    <>
      <Stack
        direction="horizontal"
        gap={3}
        className="user-card align-item-center p-2 justify-content-between hover-chat"
        onClick={() => {
          if (thisUserNotification?.length !== 0) {
            markThisUserNotificationAsRead(thisUserNotification, notification);
          }
        }}
        style={
          currenChat?._id == group._id
            ? { background: "rgb(148 163 184)", transform: " scale(1.03)" }
            : {}
        }
      >
        <div className="d-flex">
          <div className="me-2">
            <img src={recipientUser?.avatar} height="35px" />
          </div>
          <div className="text-content">
            <div className="name">{recipientUser?.name}</div>
            <div className="text">
              {lastestMessage?.text ? (
                lastestMessage.user_id !== user._id ? (
                  <span>{truncateText(lastestMessage?.text)}</span>
                ) : (
                  `Bạn: ${truncateText(lastestMessage?.text)} `
                )
              ) : (
                <small>
                  <em>Gửi tin nhắn đầu tiên cho {recipientUser?.name}</em>
                </small>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex flex-column align-item-end">
          <div className="date">
            {lastestMessage && moment(lastestMessage?.createdAt).calendar()}
          </div>
          <div
            className={
              thisUserNotification?.length > 0 ? "this-user-notifications" : ""
            }
          >
            {thisUserNotification?.length > 0
              ? thisUserNotification?.length
              : ""}
          </div>
          <span className={isOnline ? "user-online" : ""}></span>
        </div>
      </Stack>
    </>
  );
};
export default UserChat;

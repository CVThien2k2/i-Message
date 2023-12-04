import { useFetchRecipient } from "../../hooks/useFetchRecipients";
import { Container, Stack } from "react-bootstrap";
import avatar from "../../assets/avatar.svg";
import { useContext } from "react";
import { GroupContext } from "../../context/GroupContext";
const UserChat = ({ group, user }) => {
  const { recipientUser } = useFetchRecipient(group, user);
  const { onlineUsers } = useContext(GroupContext);
  const isOnline = onlineUsers.some((u) => u?.userId === recipientUser?._id);
  console.log("useronline", onlineUsers);
  return (
    <>
      <Stack
        direction="horizontal"
        gap={3}
        className="user-card align-item-center p-2 justify-content-between hover-chat"
      >
        <div className="d-flex">
          <div className="me-2">
            <img src={avatar} height="35px" />
          </div>
          <div className="text-content">
            <div className="name">{recipientUser?.name}</div>
            <div className="text">Test</div>
          </div>
        </div>
        <div className="d-flex flex-column align-item-end">
          <div className="date"> 11/1/1111</div>
          <div className="this-user-notifications">2</div>
          <span className={isOnline ? "user-online" : ""}></span>
        </div>
      </Stack>
    </>
  );
};
export default UserChat;

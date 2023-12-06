import { useContext } from "react";
import { GroupContext } from "../context/GroupContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/Authcontext";
import PotentialChat from "../components/chat/PotentialChat";
import ChatBox from "../components/chat/chatbox";
import { Button, Group, Title } from "@mantine/core";
import { MultiSelect } from "@mantine/core";
import { IconNewSection } from "@tabler/icons-react";
const Chat = () => {
  const { user } = useContext(AuthContext);
  const {
    userGroups,
    setUserGroups,
    isUserGroupLoading,
    userGroupError,
    updateCurrenChat,
  } = useContext(GroupContext);

  return (
    <>
      <div className="container-box">
        <div className="user-list-container">
          <div style={{ display: "flex" }}>
            <MultiSelect
              placeholder="Search "
              data={["React", "Angular", "Vue", "Svelte"]}
              searchable
              nothingFoundMessage="Nothing found..."
              style={{ flex: "1", textAlign: "center" }}
            />
            <IconNewSection
              style={{ width: "35px", height: "35px", marginLeft: "10px" }}
            />
          </div>

          <div className="online-status">
            <PotentialChat />
          </div>

          <div className="users">
            {isUserGroupLoading && <p>Loading chat...</p>}
            {userGroups?.map((group, index) => {
              return (
                <div key={index} onClick={() => updateCurrenChat(group)}>
                  <UserChat group={group} user={user} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="chat-container">
          <ChatBox />
        </div>
      </div>
    </>
  );
};
export default Chat;

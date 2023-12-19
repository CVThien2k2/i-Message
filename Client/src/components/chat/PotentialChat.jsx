import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";
import { GroupContext } from "../../context/GroupContext";
import { HoverCard, Button, Text, Group } from "@mantine/core";
const PotentialChat = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(GroupContext);

  return (
    <>
      <div>
        <img
          src="https://cdn3.iconfinder.com/data/icons/user-interactions-1/24/_add_message_man-512.png"
          alt="Avatar"
          className="avatar-user"
        />
      </div>
      {potentialChats &&
        potentialChats.map((u, index) => (
          <Group justify="center">
            <HoverCard width={280} shadow="md">
              <HoverCard.Target>
                <div
                  className="single-user"
                  key={index}
                  onClick={() => {
                    createChat([user._id, u._id]);
                  }}
                >
                  <img src={u.avatar} alt="Avatar" className="avatar-user" />
                  <span
                    className={
                      onlineUsers?.some((user) => {
                        return user?.userId === u?._id;
                      })
                        ? "user-online"
                        : ""
                    }
                  ></span>
                </div>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text size="sm">{u.name}</Text>
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>
        ))}
    </>
  );
};

export default PotentialChat;

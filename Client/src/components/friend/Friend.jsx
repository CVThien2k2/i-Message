import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Group,
  Table,
  Text,
  rem,
} from "@mantine/core";
import moment from "moment";
import {
  IconMessage2Share,
  IconPhoneCall,
  IconUserPlus,
} from "@tabler/icons-react";
import { useContext } from "react";
import { GroupContext } from "../../context/GroupContext";

const Friend = ({ user, isfriend }) => {
  const { onlineUsers } = useContext(GroupContext);
  const isOnline = onlineUsers.some((u) => u?.userId === user?._id);
  return (
    <>
      <Table.Tr
        key={user.name}
        onClick={() => {
          console.log("Hello");
        }}
        className="TableRow"
      >
        <Table.Td>
          <Group gap="sm">
            <Avatar size={30} src={user.avatar} radius={30} />
            <Text fz="sm" fw={500}>
              {user.name}
            </Text>
          </Group>
        </Table.Td>

        <Table.Td>
          <Badge variant="light" color={isOnline ? "green" : "red"}>
            {!isOnline ? moment(user.updatedAt).fromNow() : "Online"}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Anchor component="button" size="sm">
            {user.email}
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Text fz="sm">+84 {user.numberPhone}</Text>
        </Table.Td>
        <Table.Td>
          <Group gap={10} justify="flex-end">
            {!isfriend && (
              <ActionIcon variant="subtle" color="red">
                <IconUserPlus
                  style={{ width: rem(20), height: rem(20) }}
                  stroke={1.5}
                />
              </ActionIcon>
            )}
            <ActionIcon variant="subtle" color="green">
              <IconPhoneCall
                style={{ width: rem(20), height: rem(20) }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon variant="subtle" color="blue">
              <IconMessage2Share
                style={{ width: rem(20), height: rem(20) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    </>
  );
};

export default Friend;

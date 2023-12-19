import { Divider, Table, TextInput } from "@mantine/core";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import { AuthContext } from "../../context/Authcontext";
import { FriendContext } from "../../context/FriendContext";
import { GroupContext } from "../../context/GroupContext";
import Friend from "./friend";
import ViewProfile from "../profile/ViewProfile";
import { useState } from "react";

export function ListFriend({}) {
  const { friends, friendsRequests, friendsRequestsWaiting } =
    useContext(FriendContext);
  const [search, setSearch] = useState("");
  const { allUser } = useContext(GroupContext);
  const { user } = useContext(AuthContext);
  const users = allUser?.filter((u) => u._id !== user._id);
  const notFriends = allUser?.filter((u) => {
    if (!friends?.includes(u._id) && u._id !== user?._id) return true;
  });
  return (
    <>
      <ViewProfile />
      <Container>
        <TextInput
          placeholder="Search by name, email, or phone"
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
        {friends?.length > 1 ? (
          <Divider
            my="xs"
            size={10}
            label="Your Friends"
            labelPosition="center"
          />
        ) : (
          ""
        )}
        {users?.length > 1 ? (
          <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Online</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Phone</Table.Th>
                  <Table.Th />
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {users
                  ?.filter((u) => {
                    const isMatch =
                      u.name &&
                      u.email &&
                      (u.name.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase()) ||
                        u.numberPhone
                          .toString()
                          .includes(search.toLowerCase()));
                    return isMatch;
                  })
                  ?.map((u, index) => (
                    <Friend user={u} isfriend={true} key={index} />
                  ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        ) : (
          ""
        )}
      </Container>
    </>
  );
}

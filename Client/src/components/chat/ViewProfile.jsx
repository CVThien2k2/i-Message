import { useContext, useState } from "react";

import Modal from "react-bootstrap/Modal";
import { FriendContext } from "../../context/FriendContext";
import { Avatar, Text, Button, Paper } from "@mantine/core";
function ViewProfile() {
  const { viewProfile, updateViewProfile, userView, updateUserView } =
    useContext(FriendContext);

  if (!viewProfile) return null;
  if (!userView) return null;
  console.log(userView);
  return (
    <>
      <Modal
        show={true}
        onHide={updateViewProfile}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
              size={120}
              radius={120}
              mx="auto"
            />
            <Text ta="center" fz="lg" fw={500} mt="md">
              {userView.name}
            </Text>
            <Text ta="center" c="dimmed" fz="sm">
              {userView.email} • {userView.email}
            </Text>

            <Button variant="default" fullWidth mt="md">
              Send message
            </Button>
          </Paper>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={updateViewProfile}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewProfile;

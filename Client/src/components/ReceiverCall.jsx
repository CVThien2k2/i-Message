import { useContext } from "react";

import Modal from "react-bootstrap/Modal";
import { CallContext } from "../context/CallContext";
import { Avatar, Text, Button, Paper } from "@mantine/core";
const ReceiverCall = () => {
  const { receivingCall, rejectCall, acceptCall, caller } =
    useContext(CallContext);

  if (!receivingCall) return null;
  return (
    <>
      <Modal
        show={true}
        onHide={rejectCall}
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Có cuộc gọi mới </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
            <Avatar src={caller.avatar} size={120} radius={120} mx="auto" />
            <Text ta="center" fz="lg" fw={500} mt="md">
              {caller.name}
            </Text>
          </Paper>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              acceptCall();
            }}
          >
            Accepect
          </Button>
          <Button color="red" onClick={rejectCall}>
            Reject
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReceiverCall;

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { CallContext } from "../../context/CallContext";
import { Avatar, Text, Button, Paper } from "@mantine/core";
import { GroupContext } from "../../context/GroupContext";
const ReceiverCall = () => {
  const { receivingCall, rejectCall, acceptCall, groupCurrent, caller } =
    useContext(CallContext);
  const navigate = useNavigate();
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
          <Modal.Title>Calling </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
            <Avatar
              src={
                groupCurrent.userCount < 3 ? caller.avatar : groupCurrent.avatar
              }
              size={120}
              radius={120}
              mx="auto"
            />
            <Text ta="center" fz="lg" fw={500} mt="md">
              {groupCurrent.userCount < 3 ? caller.name : groupCurrent.name}
            </Text>
          </Paper>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              acceptCall();
              window.open(
                `http://localhost:3030/${groupCurrent._id}`,
                "_blank"
              );
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

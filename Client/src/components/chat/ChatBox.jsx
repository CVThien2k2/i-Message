import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/Authcontext";
import { GroupContext } from "../../context/GroupContext";
import { useFetchRecipient } from "../../hooks/useFetchRecipients";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";
const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const {
    currenChat,
    messages,
    isMessagesLoading,
    sendTextMessage,
    setSendTextMessageError,
  } = useContext(GroupContext);
  const { recipientUser } = useFetchRecipient(currenChat, user);
  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" }), [messages];
  });
  return (
    <Stack gap={4} className="chat-box">
      {!recipientUser ? (
        <div
          className="chat-box"
          style={{
            textAlign: "center",
            height: "100%",
            width: "100%",
            height: "calc(100vh - 10rem)",
            background: "rgb(186 230 253)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://icon-library.com/images/select-icon-png/select-icon-png-0.jpg"
            width="70px"
            height="70px"
          />
          No Conversation selected yet!
        </div>
      ) : (
        <>
          <header className="chat-header">
            <strong>{recipientUser?.name}</strong>
          </header>

          <Stack gap={3} className="messages">
            {messages &&
              messages.map((message, index) => (
                <Stack
                  key={index}
                  className={`${
                    message?.user_id === user?._id
                      ? "mess self align-self-end flex-grow-0"
                      : "mess  align-self-start flex-grow-0"
                  }`}
                  ref={scroll}
                >
                  <Stack direction="horizontal">
                    {message?.user_id !== user?._id && (
                      <img
                        src={recipientUser?.avatar}
                        height="35px"
                        style={{ marginRight: "10px" }}
                      />
                    )}
                    <Stack
                      className={`${
                        message?.user_id === user?._id
                          ? "message self align-self-end flex-grow-0"
                          : "message  align-self-start flex-grow-0"
                      }`}
                    >
                      <span>{message.text}</span>
                      <span>{moment(message.createdAt).calendar()}</span>
                    </Stack>
                  </Stack>
                </Stack>
              ))}
          </Stack>

          <footer>
            <Stack
              direction="horizontal"
              gap={3}
              className="chat-input flex-grow-1"
            >
              <InputEmoji
                value={textMessage}
                onChange={setTextMessage}
                fontFamily="nunito"
                borderColor="rbga(72,112,223,0.2)"
              />
              <button
                className="send-btn"
                onClick={() =>
                  sendTextMessage(
                    textMessage,
                    user,
                    currenChat._id,
                    setTextMessage
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-send"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg>
              </button>
            </Stack>
          </footer>
        </>
      )}
    </Stack>
  );
};

export default ChatBox;

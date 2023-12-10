import React from "react";
import {
  Paperclip,
  Image,
  SendFill,
  EmojiLaughing,
} from "react-bootstrap-icons";

const Input = () => {
  return (
    <div className="Input">
      <div className="emojiAndInput">
        <div className="emojiContainer">
          <EmojiLaughing className="emoji" size={15} />
        </div>

        <input
          className="message-input"
          type="text"
          placeholder="Your message here..."
        />
      </div>
      <div className="send">
        <div className="sendFile">
          {/* <input type="text" style={{ display: "none" }} id="file" /> */}
          <Paperclip className="file" />
        </div>
        <button className="sendButton">
          <SendFill color="white" size={15} />
        </button>
      </div>
    </div>
  );
};

export default Input;

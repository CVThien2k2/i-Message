// ChatRoom/index.js
import React from 'react';
import './ChatRoom.css'; // Import file CSS tùy chỉnh

const ChatRoom = () => {
  return (
    <div className="chat-room">
      <div className="chat-list">
        <div className="chat-list-header">Danh sách đoạn chat</div>
        <ul className="chat-list-items">
          {/* Danh sách các đoạn chat */}
          <li className="chat-item">Đoạn chat 1</li>
          <li className="chat-item">Đoạn chat 2</li>
          {/* ... */}
        </ul>
      </div>
      <div className="chat-window">
        <div className="chat-window-header">Nội dung đoạn chat</div>
        <div className="chat-window-content">
          {/* Nội dung đoạn chat */}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;

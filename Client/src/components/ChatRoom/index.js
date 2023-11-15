import { UserAddOutlined } from '@ant-design/icons';
// import React, { useContext, useEffect, useRef, useState } from 'react';
// import styled from 'styled-components';
import { Button, Tooltip, Avatar, Form, Input, Alert } from 'antd';

import React from 'react';
import { Row, Col } from 'antd';
import './ChatRoom.css';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';

const ChatRoom = () => {
  return (
    <div className="chat-room-container">
      <Row className="full-height">
        <Col span={8} className="full-height no-scroll">
          <Sidebar />
        </Col>
        <Col span={16} className="full-height no-scroll">
          <ChatWindow />
        </Col>
      </Row>
    </div>
  );
};

export default ChatRoom;




import { UserAddOutlined } from '@ant-design/icons';
// import React, { useContext, useEffect, useRef, useState } from 'react';
// import styled from 'styled-components';
import { Button, Tooltip, Avatar, Form, Input, Alert } from 'antd';

import React from 'react';
import {Row, Col} from 'antd';
import './ChatRoom.css'; // Import file CSS tùy chỉnh
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';

export default function ChatRoom() {
  return (
    <Row>
      <Col span={8}><Sidebar/></Col>
      <Col span={16}><ChatWindow/></Col>
    </Row>
  );
};



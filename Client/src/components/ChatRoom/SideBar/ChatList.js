import React, { useState, useEffect } from 'react';
import { List, Avatar } from 'antd';
import styled from 'styled-components';
import axios from 'axios';

const ChatListWrapper = styled.div`
  .ant-list-item {
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
  }

  .ant-avatar {
    background-color: #f56a00;
    vertical-align: middle;
  }
`;

const chatData = [
  { name: 'Test1', message: 'Hello there!' },
  { name: 'Test2', message: 'How are you?' },
];

export default function ChatList() {

  // const [chatData, setChatData] = useState([]);

  // useEffect(() => {
  //   axios.get('YOUR_BACKEND_API_ENDPOINT')
  //     .then((response) => {
  //       setChatData(response.data); 
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching chat data:', error);
  //     });
  // }, []); 
  return (
    <ChatListWrapper>
    <List
      itemLayout="horizontal"
      dataSource={chatData}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar>{item.name.charAt(0)}</Avatar>}
            title={item.name}
            description={item.message}
          />
        </List.Item>
      )}
    />
  </ChatListWrapper>
);
};


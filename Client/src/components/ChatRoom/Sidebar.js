import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import UserInfo from './UserInfo';
import ChatList from './ChatList';
import Search from './Search';
import styled from 'styled-components';
import AddFriend from './AddFriend';

const StyleSidebar = styled.div`
  background-color: #48335E; /* Màu xám đậm */
  color: #ffffff; /* Màu chữ */
  height: 100vh;
  padding: 20px;
  position: relative; /* Sử dụng position relative cho StyleSidebar */
`;

const ContentWrapper = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #442665; /* Màu nền cho phần content */
  border-radius: 5px;
`;

const AddFriendWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 10;
  width: auto;;
`;

export default function Sidebar() {
  const [visible, setVisible] = useState(false);

  const handleAddFriend = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleAddNewFriend = (friendUsername) => {
    console.log('Adding new friend:', friendUsername);
  };

  return (
    <StyleSidebar>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <ContentWrapper>
            <Search />
          </ContentWrapper>
        </Col>
        <Col span={24}>
          <ContentWrapper>
            <ChatList />
          </ContentWrapper>
        </Col>
        <AddFriendWrapper>
          <Col span={24}>
            <ContentWrapper>
              <Button onClick={handleAddFriend}>Thêm bạn bè</Button>
              <AddFriend
                visible={visible}
                onClose={handleClose}
                onAddFriend={handleAddNewFriend}
              />
            </ContentWrapper>
          </Col>
        </AddFriendWrapper>
      </Row>
    </StyleSidebar>
  );
}

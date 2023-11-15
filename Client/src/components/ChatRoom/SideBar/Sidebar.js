import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import UserInfo from './UserInfo';
import ChatList from './ChatList';
import Search from './Search';
import styled from 'styled-components';
import AddFriend from './AddFriend';
import CreateGroup from './CreateGroup';

const StyleSidebar = styled.div`
  background-color: #48335E; 
  color: #ffffff;
  height: 100vh;
  padding: 20px;
  position: relative; 
`;

const ContentWrapper = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #442665; 
  border-radius: 5px;
`;

// const AddFriendWrapper = styled.div`
//   position: fixed;
//   bottom: 0;
//   left: 10;
//   width: auto;
//   display: flex;
//   width: 100%;
//   justify-content: space-between;
// `;

const WrapperAdditional = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);
  color: white;
  bottom: 0;
  border-radius: 15px; 
`

export default function Sidebar() {
  const [visible, setVisible] = useState(false);
  const [createGroupVisible, setCreateGroupVisible] = useState(false);

  const handleAddFriend = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleAddNewFriend = (friendUsername) => {
    console.log('Adding new friend:', friendUsername);
  };

  const handleCreateGroup = () => {
    setCreateGroupVisible(true);
  };

  const handleCloseCreateGroup = () => {
    setCreateGroupVisible(false);
  };

  return (
    <StyleSidebar>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          {/* Các phần tử sidebar khác ở đây */}
          <UserInfo />
          <ContentWrapper>
            <Search />
          </ContentWrapper>
          <ContentWrapper>
            <ChatList />
          </ContentWrapper>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <WrapperAdditional>
            <ContentWrapper>
              <Button onClick={handleAddFriend}>Thêm bạn bè</Button>
              <AddFriend
                visible={visible}
                onClose={handleClose}
                onAddFriend={handleAddNewFriend}
              />
            </ContentWrapper>
            <ContentWrapper>
              <Button onClick={handleCreateGroup}>Tạo nhóm</Button>
              <CreateGroup
                visible={createGroupVisible}
                onClose={handleCloseCreateGroup}
              />
            </ContentWrapper>
          </WrapperAdditional>
        </div>
      </div>
    </StyleSidebar>
  );
}

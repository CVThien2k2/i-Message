import React from 'react'
import {Row, Col} from 'antd'
import UserInfo from './UserInfo'
import ChatList from './ChatList'
import Search from './Search'
import styled from 'styled-components'


const StyleSidebar = styled.div`
  background-color: #48335E; /* Màu xám đậm */
  color: #ffffff; /* Màu chữ */
  height: 100vh;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #442665; /* Màu nền cho phần content */
  border-radius: 5px;
`;

export default function Sidebar() {
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
        </Row>
      </StyleSidebar>
    );
}

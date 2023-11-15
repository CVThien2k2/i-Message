import React from 'react';
import { Collapse, Typography } from 'antd';
import styled from 'styled-components';

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-typography {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }
  }
`;

const StyledLink = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #1890ff; /* Màu khi hover */
  }
`;

export default function ChatList() {
  return (
    <Collapse ghost defaultActiveKey={['1']}>
      <PanelStyled header="Danh sách các phòng" key="1">
        <StyledLink>
        <Typography style={{ color: 'white' }}>Room 1</Typography>
        <Typography style={{ color: 'white' }}>Room 2</Typography>
        <Typography style={{ color: 'white' }}>Room 3</Typography>
        </StyledLink>
      </PanelStyled>
    </Collapse>
  );
}

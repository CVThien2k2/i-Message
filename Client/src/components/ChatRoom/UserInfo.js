import React from 'react'
import { Button, Avatar, Typography } from 'antd'
import styled from 'styled-components'

const WrapperStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);
  color: white;
  border-radius: 15px; /* Đường viền bo cong */

  .name {
    color: white;
    margin-left: 5px;
  }
`;

export default function UserInfo() {
  return (

    <WrapperStyle>
        <div>
            <Avatar>Avt</Avatar>
            <Typography.Text className='name'>user's name</Typography.Text>
        </div>
        <Button>Đăng xuất</Button>
    </WrapperStyle>
  )
}

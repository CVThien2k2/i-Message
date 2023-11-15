import { Avatar, Button, Tooltip, Form } from 'antd';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { UsergroupAddOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import Message from './Chat';

const ToolBarStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .toolbar_info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .header {
    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const WrapperStyled = styled.div`
  height: 100vh;
`;
const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;
const ChatStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const ChatListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const FormStyled = styled(Form)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ccc;
  

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }

  input {
    width: calc(100% - 20%); /* Để tạo khoảng cách cho nút Gửi */
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    width: 70px;
    margin-left: 10px;
  }
`;

const IconButton = styled(Button)`
  background-color: #1890ff; /* Màu xanh */
  border: none; /* Loại bỏ viền */
  margin-left: 10px;
`;


export default function ChatWindow() {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    console.log('Selected file:', selectedFile);
    // Xử lý tập tin đã được chọn tại đây
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <WrapperStyled>
      <ToolBarStyled>
        <div className='toolbar_info'>
          <p className='header__title'>nguoi 1</p>
          <span className='header__description'>Day la nguoi 1</span>
        </div>
        <ButtonGroup>
          <Button icon={<UsergroupAddOutlined />} type='text'>Thêm bạn</Button>
          <Avatar.Group size='small' maxCount={2}>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title="B">
              <Avatar>B</Avatar>
            </Tooltip>
            <Tooltip title="C">
              <Avatar>C</Avatar>
            </Tooltip>
          </Avatar.Group>
        </ButtonGroup>
      </ToolBarStyled>
      <ChatStyled>
        <ChatListStyled>
          <Message text="Test1" photoURL={null} displayName="Thuong1" createdAt={342432523423}></Message>
          <Message text="Test2" photoURL={null} displayName="Thuong2" createdAt={342432523423}></Message>
          <Message text="Test3" photoURL={null} displayName="Thuong3" createdAt={342432523423}></Message>
          <Message text="Test4" photoURL={null} displayName="Thuong4" createdAt={342432523423}></Message>

        </ChatListStyled>
        <FormStyled>
          <Form.Item>
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
            <input placeholder='Nhập tin nhắn' bordered={false} autoComplete='off'/>
            <Button type='primary'>Gửi</Button>
            <IconButton type='text' icon={<VerticalAlignTopOutlined />} onClick={handleButtonClick}/> 
          </Form.Item>
        </FormStyled>
        
      </ChatStyled>
    </WrapperStyled>
  );
}

import React, { useState } from 'react';
import { Modal, Input, Button, List } from 'antd';

const AddFriendToGroup = ({ groupName, onClose }) => {
  const [friendUsername, setFriendUsername] = useState('');
  const [friendsList, setFriendsList] = useState([]); // Danh sách bạn bè

  const handleAddFriend = () => {
    // Thêm bạn bè vào danh sách
    setFriendsList([...friendsList, friendUsername]);
    setFriendUsername(''); // Reset ô input

    // Thực hiện logic thêm bạn bè vào nhóm ở đây nếu cần
    console.log(`Thêm ${friendUsername} vào nhóm ${groupName}`);
  };

  const handleFinishAddingFriends = () => {
    // Khi đã thêm xong bạn bè, có thể có logic xử lý ở đây (ví dụ: gọi API để lưu danh sách bạn bè vào nhóm)

    // Đóng modal sau khi hoàn thành
    onClose();
  };

  return (
    <Modal
      title={`Thêm bạn bè vào nhóm "${groupName}"`}
      visible={true}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="add" type="primary" onClick={handleAddFriend} disabled={!friendUsername}>
          Thêm
        </Button>,
        <Button key="finish" type="primary" onClick={handleFinishAddingFriends}>
          Hoàn thành
        </Button>,
      ]}
    >
      <Input
        placeholder="Nhập username của bạn bè"
        value={friendUsername}
        onChange={(e) => setFriendUsername(e.target.value)}
        style={{ marginBottom: '12px' }}
      />
      <List
        size="small"
        bordered
        dataSource={friendsList}
        renderItem={(item) => <List.Item>{item}</List.Item>}
        style={{ maxHeight: '200px', overflow: 'auto' }}
      />
    </Modal>
  );
};

export default AddFriendToGroup;

import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import AddFriendToGroup from './AddFriendToGroup'; // Component thêm bạn bè vào nhóm

const CreateGroup = ({ visible, onClose }) => {
  const [groupName, setGroupName] = useState('');
  const [isNameEntered, setIsNameEntered] = useState(false);

  const handleCreateGroup = () => {
    setIsNameEntered(true); // Đánh dấu rằng tên nhóm đã được nhập và chuyển đến bước tiếp theo
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title={!isNameEntered ? 'Tạo nhóm mới' : 'Thêm bạn bè vào nhóm'}
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>,
        !isNameEntered && (
          <Button key="create" type="primary" onClick={handleCreateGroup}>
            Tiếp theo
          </Button>
        ),
      ]}
    >
      {!isNameEntered ? (
        <Input
          placeholder="Nhập tên nhóm"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      ) : (
        <AddFriendToGroup groupName={groupName} onClose={onClose} />
      )}
    </Modal>
  );
};

export default CreateGroup;

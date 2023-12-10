import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

export default function AddFriend({ visible, onClose, onAddFriend }) {
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
    // Xử lý thêm bạn bè
    onAddFriend(values.friendUsername);
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Thêm bạn bè"
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} name="addFriendForm" onFinish={onFinish}>
        <Form.Item
          name="friendUsername"
          label="Tên bạn bè"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên bạn bè!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

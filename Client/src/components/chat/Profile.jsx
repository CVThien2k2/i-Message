import React, { useState } from "react";
import { Card, Col, Image, Row, Form, Button } from "react-bootstrap";

function Profile() {
  const initialProfileData = {
    fullName: "Nguyễn Thị Huyền Nhi",
    description: "Hehehe",
    email: "info@gmail.com",
    phone: "123 456 789",
    dateOfBirth: "01/01/2002",
    address: "123 Đường ABC, Thành phố XYZ",
    sex: "Nữ",
  };

  const [profileData, setProfileData] = useState(initialProfileData);
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // Xử lý logic để lưu thông tin đã chỉnh sửa vào database
    setEditMode(false);
  };

  const handleCancelClick = () => {
    setProfileData(initialProfileData);
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  return (
    <>
      <p>Vào code code giao diện profile đi</p>
    </>
  );
}

export default Profile;

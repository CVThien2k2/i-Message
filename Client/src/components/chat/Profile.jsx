import React, { useState, useEffect, useContext } from "react";
import { Card, Col, Image, Row, Form, Button } from "react-bootstrap";
import { AuthContext } from "../../context/Authcontext";
import { postRequest, baseUrl } from "../../utils/services";
import { Plus } from "react-bootstrap-icons";

export default function Profile() {
  /////////////////
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(user);
  const [editMode, setEditMode] = useState(false);
  console.log(profileData);
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Đọc file thành base64 và lưu vào profileData.avatar
      setProfileData({ ...profileData, avatar: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  // const updateUserProfile = async (updatedProfileData) => {
  //   try {
  //     const response = await postRequest(
  //       `${baseUrl}/auth/create`,
  //       JSON.stringify(updatedProfileData)
  //     );

  //     if (!response.error) {
  //       setProfileData(updatedProfileData);
  //       console.log("Profile updated successfully!");
  //     } else {
  //       console.error("Error updating profile:", response.message);
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //   }
  // };

  const handleEditClick = () => {
    setEditMode(true);
  };
  const handleSaveClick = async () => {
    try {
      await updateUserProfile(profileData);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving profile changes:", error);
    }
  };

  const handleCancelClick = () => {
    setProfileData(profileData);
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
};

export default Profile;

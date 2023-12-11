import React, { useState, useEffect, useContext } from "react";
import { Card, Col, Image, Row, Form, Button } from "react-bootstrap";
import { AuthContext } from "../../context/Authcontext";
import { postRequest, baseUrl } from "../../utils/services";
import { IconPlus } from "@tabler/icons-react";
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
    <section
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#f4f5f7" }}
    >
      <Card className="w-100 h-100" style={{ borderRadius: ".5rem" }}>
        <Row className="w-100 h-100">
          <Col
            md="4"
            className="gradient-custom text-center text-white"
            style={{
              borderTopLeftRadius: ".5rem",
              borderBottomLeftRadius: ".5rem",
            }}
          >
            <div>
              <div className="profile-image-container">
                <img
                  src={profileData.avatar}
                  alt="Avatar"
                  className="my-5 profile-image"
                  style={{ width: "300px" }}
                />
                <label htmlFor="fileInput">
                  <Button variant="primary" className="button-under-image">
                    <IconPlus style={{ marginRight: "5px" }} />
                  </Button>
                </label>
                <input
                  id="fileInput"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileInputChange}
                />
              </div>
              <h5 className="h5-button-spacing" style={{ color: "black" }}>
                {profileData.name}
              </h5>
            </div>
          </Col>
          <Col md="8">
            <Card.Body className="p-4">
              {editMode ? (
                <Form>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                      Email
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                      Phone
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        name="numberPhone"
                        value={profileData.numberPhone}
                        onChange={handleChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                      Name
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                      Address
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        name="address"
                        value={profileData.address}
                        onChange={handleChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                      Gender
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        as="select"
                        name="gender"
                        value={profileData.gender}
                        onChange={handleChange}
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>
                  <div className="text-center mt-4 mb-4">
                    <Button variant="primary" onClick={handleSaveClick}>
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      className="ms-2"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              ) : (
                <div>
                  <Row className="mb-3">
                    <Col sm="6">
                      <h6>Email</h6>
                      <p className="text-muted">{profileData.email}</p>
                    </Col>
                    <Col sm="6">
                      <h6>Phone</h6>
                      <p className="text-muted">{profileData.numberPhone}</p>
                    </Col>
                    <Col sm="6">
                      <h6>Name</h6>
                      <p className="text-muted">{profileData.name}</p>
                    </Col>
                    <Col sm="6">
                      <h6>Address</h6>
                      <p className="text-muted">{profileData.address}</p>
                    </Col>
                    <Col sm="6">
                      <h6>Gender</h6>
                      <p className="text-muted">{profileData.gender}</p>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-start">
                    <a href="#!" className="me-3">
                      <i className="fab fa-facebook fa-lg"></i>
                    </a>
                    <a href="#!" className="me-3">
                      <i className="fab fa-twitter fa-lg"></i>
                    </a>
                    <a href="#!" className="me-3">
                      <i className="fab fa-instagram fa-lg"></i>
                    </a>
                  </div>
                </div>
              )}
              {!editMode && (
                <div className="text-center mb-4">
                  <Button variant="primary" onClick={handleEditClick}>
                    Edit
                  </Button>
                </div>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </section>
  );
}

import React, { useState } from "react";
import { Card, Col, Image, Row, Form, Button } from "react-bootstrap";

export default function Profile() {
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
            <Image
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
              alt="Avatar"
              className="my-5"
              style={{ width: "80px" }}
              fluid
            />
            <h5>{profileData.fullName}</h5>
            <p>{profileData.description}</p>
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
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                      Date of birth
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="date"
                        name="dateOfBirth"
                        value={profileData.dateOfBirth}
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
                      Sex
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        as="select"
                        name="sex"
                        value={profileData.sex}
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
                      <p className="text-muted">{profileData.phone}</p>
                    </Col>
                    <Col sm="6">
                      <h6>Date of birth</h6>
                      <p className="text-muted">{profileData.dateOfBirth}</p>
                    </Col>
                    <Col sm="6">
                      <h6>Address</h6>
                      <p className="text-muted">{profileData.address}</p>
                    </Col>
                    <Col sm="6">
                      <h6>Sex</h6>
                      <p className="text-muted">{profileData.sex}</p>
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

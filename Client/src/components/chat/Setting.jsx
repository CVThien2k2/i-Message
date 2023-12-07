import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const Setting = () => {
  return (
    <div className="setting-container">
      <div className="header text-center mt-4 mb-4">
        <h3>Edit my profile</h3>
      </div>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter full name" />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" placeholder="Enter phone number" />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="sex">
            <Form.Label>Sex</Form.Label>
            <Form.Control as="select" defaultValue="Choose...">
              <option>Other</option>
              <option>Male</option>
              <option>Female</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="dateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" placeholder="Enter date of birth" />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter address" />
          </Form.Group>
        </Row>
        <div className="text-center mt-4 mb-4">
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Setting;

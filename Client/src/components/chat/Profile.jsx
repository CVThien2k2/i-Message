import React from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';

export default function PersonalProfile() {
  return (
    <section className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f4f5f7' }}>
      <Card className="w-100 h-100" style={{ borderRadius: '.5rem' }}>
        <Row className="w-100 h-100">
          <Col md="4" className="gradient-custom text-center text-white" style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
            <Image src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
              alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
            <h5>Nguyễn Thị Huyền Nhi</h5>
            <p>Hehehe</p>
            <i className="far fa-edit mb-5"></i>
          </Col>
          <Col md="8">
            <Card.Body className="p-4">
              <h6 >Information</h6>
              <hr className="mt-0 mb-4" />
              <Row className="pt-1">
                <Col sm="6" className="mb-3">
                  <h6>Email</h6>
                  <p className="text-muted">info@gmail.com</p>
                </Col>
                <Col sm="6" className="mb-3">
                  <h6>Phone</h6>
                  <p className="text-muted">123 456 789</p>
                </Col>
                <Col sm="6" className="mb-3">
                  <h6>Date of birth</h6>
                  <p className="text-muted">01/01/2002</p>
                </Col>
                <Col sm="6" className="mb-3">
                  <h6>Address</h6>
                  <p className="text-muted">123 Đường ABC, Thành phố XYZ</p>
                </Col>
                <Col sm="6" className="mb-3">
                  <h6>Sex</h6>
                  <p className="text-muted">Nữ</p>
                </Col>
              </Row>
              <h6>Other</h6>
              <hr className="mt-0 mb-4" />
              <div className="d-flex justify-content-start">
                <a href="#!" className="me-3"><i className="fab fa-facebook fa-lg"></i></a>
                <a href="#!" className="me-3"><i className="fab fa-twitter fa-lg"></i></a>
                <a href="#!" className="me-3"><i className="fab fa-instagram fa-lg"></i></a>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </section>
  );
}

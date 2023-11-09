import React from 'react';
import { Button, Row, Col } from 'antd';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import './LoginPage.css'; 

const LoginPage = () => {
  const handleFacebookLogin = () => {
  
  };

  const handleGoogleLogin = () => {

  };

  return (
    <div className="login-page">     
      <h1 className="app-name">Four T</h1>
      <Row>
        <Col>
          <Button
            type="primary"
            icon={<FacebookOutlined />}
            size="large"
            onClick={handleFacebookLogin}
            style={{ backgroundColor: '#1877F2', borderColor: '#1877F2', width: '100%', marginBottom: 10}}
          >
            Đăng nhập bằng Facebook
          </Button>
          <Button
            type="danger"
            icon={<GoogleOutlined />}
            size="large"
            onClick={handleGoogleLogin}
            style={{ backgroundColor: 'white', borderColor: 'gray', width: '100%' }}
          >
            Đăng nhập bằng Google
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;

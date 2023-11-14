import React from 'react';
import { Button, Row, Typography, Col } from 'antd';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';

import './LoginPage.css'; 
// import firebase {auth} from '';



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
            className="fbButton"
          >
            Đăng nhập bằng Facebook
          </Button>
          <Button
            type="danger"
            icon={<GoogleOutlined />}
            size="large"
            onClick={handleGoogleLogin}
            className="ggButton"
          >
            Đăng nhập bằng Google
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;

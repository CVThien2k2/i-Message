import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import {useNavigate } from 'react-router-dom';
import firebase, { auth } from '../../firebase/config';
// import { addDocument, generateKeywords } from '../../firebase/services';
import './LoginPage.css'; 
// import firebase {auth} from '';

const { Title } = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();
const ggProvider = new firebase.auth.GoogleAuthProvider();

const LoginPage = () => {
  // const handleLogin = async (provider) => {
  //   const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

  //   if (additionalUserInfo?.isNewUser) {
  //     addDocument('users', {
  //       displayName: user.displayName,
  //       email: user.email,
  //       photoURL: user.photoURL,
  //       uid: user.uid,
  //       providerId: additionalUserInfo.providerId,
  //       keywords: generateKeywords(user.displayName?.toLowerCase()),
  //     });
  //   }
  const navigate = useNavigate();
  const handleFbLogin = () => {
    auth.signInWithPopup(fbProvider);
  }
  
  auth.onAuthStateChanged((user) => {
     console.log({user});
     if(user) {
      navigate('/');
     }
  })

  return (
    <div className="login-page">     
      <h1 className="app-name">Four T</h1>
      <Row>
        <Col>
          <Button
            type="primary"
            icon={<FacebookOutlined />}
            size="large"
            onClick={handleFbLogin}
            className="fbButton"
          >
            Đăng nhập bằng Facebook
          </Button>
          <Button
            type="danger"
            icon={<GoogleOutlined />}
            size="large"
            // onClick={() => handleLogin(ggProvider)}
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

import { useContext } from 'react';
import { Form, Row, Col, Button, Alert, Stack } from 'react-bootstrap';
import { AuthContext } from '../context/Authcontext';
const Register = () => {
    const { registerInfo, updateRegisterInfo, registerUser, isRegisterLoading, registerError} = useContext(AuthContext)
    return (<>
        <>
            <Form onSubmit={registerUser}>
                <Row
                    style={{
                        height: "100vh",
                        justifyContent: "center",
                        paddingTop: '10%'
                    }}>
                    <Col xs={6}>
                        <Stack gap={3} >
                            <h2 >Đăng ký</h2>
                            <Form.Control type='text' placeholder='Họ tên' onChange={(e) => updateRegisterInfo({ ...registerInfo, name: e.target.value })} />
                            <Form.Control type='password' placeholder='Mật khẩu' onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })} />
                            <Form.Control type='text' placeholder='Email' onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })} />
                            <Form.Control type='number' placeholder='Số điện thoại' onChange={(e) => updateRegisterInfo({ ...registerInfo, numberPhone: e.target.value })} />
                            <Button variant='primary' type='submit' >
                                {isRegisterLoading ? "Đang tạo tài khoản của bạn": "Đăng ký"}
                            </Button>
                            {registerError?.error && <Alert variant='danger'>
                                <p>{registerError?.message}</p>
                            </Alert>}
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
    </>)
}
export default Register;
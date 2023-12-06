import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Stack } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import ".././index.css";
import Notification from "./chat/Notification";
import Button from "react-bootstrap/Button";
function NavBar() {
  const { user, logOutUser } = useContext(AuthContext);
  return (
    <Navbar expand="lg" className="bg-primary mb-4">
      <Container>
        <Navbar.Brand href="#home" className="link-light">
          Messenger
        </Navbar.Brand>
        <Nav>
          <Stack direction="horizontal" gap={3} className="nav-stack">
            {user && (
              <>
                <Nav.Link href="#memes" className="text-light mx-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-messenger"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.639.639 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.639.639 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76m5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z" />
                  </svg>
                </Nav.Link>
                <Nav.Link href="#memes" className="text-light mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-people-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                  </svg>
                </Nav.Link>

                <Notification />
                <Nav.Link
                  onClick={logOutUser}
                  href="/login"
                  className="link-light text-decoration-none notify"
                >
                  Đăng xuất
                </Nav.Link>
                <Nav.Link className="link-light text-decoration-none">
                  <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp&w=256"
                    alt="Avatar"
                    className="avatar-user"
                    title={user.name}
                  />
                </Nav.Link>
              </>
            )}
            {!user && (
              <>
                <Nav.Link
                  href="/login"
                  className="link-light text-decoration-none"
                >
                  Sign in
                </Nav.Link>
                <Nav.Link
                  href="/register"
                  className="link-light text-decoration-none"
                >
                  Sign up
                </Nav.Link>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;

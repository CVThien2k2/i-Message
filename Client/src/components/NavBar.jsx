import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Stack } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import ".././index.css";
function NavBar() {
  const { user, logOutUser } = useContext(AuthContext);
  return (
    <Navbar expand="lg" className="bg-primary mb-4">
      <Container>
        <Navbar.Brand href="#home" className="link-light">
          ChipChip
        </Navbar.Brand>
        <Nav>
          <Stack direction="horizontal" gap={3} className="nav-stack">
            {user && (
              <>
                <Nav.Link
                  onClick={logOutUser}
                  href="/login"
                  className="link-light text-decoration-none"
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

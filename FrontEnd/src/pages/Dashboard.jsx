import { Title, Text, Button, Container } from "@mantine/core";
import { Dots } from "../styles/Dot";
import classes from "../styles/Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import useAccess from "../hooks/useAuth";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Feature from "../components/Fearture";

export function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isLoading, logoutUser } = useAccess();
  return (
    <>
      <Header />
      {/* <Container className={classes.wrapper} size={1400}>
        <div className={classes.inner}>
          <Title className={classes.title}>
            Tham gia iMessage{" "}
            <Text component="span" className={classes.highlight} inherit>
              để có thể
            </Text>{" "}
            trò chuyện với mọi người!
          </Title>

          <div className={classes.controls}>
            {isAuthenticated ? (
              <Button
                className={classes.control}
                size="lg"
                variant="default"
                color="gray"
                loading={isLoading}
                onClick={() => {
                  logoutUser();
                }}
              >
                Đăng xuất
              </Button>
            ) : (
              <>
                <Button
                  className={classes.control}
                  size="lg"
                  variant="default"
                  color="gray"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Đăng nhập
                </Button>
                <Button
                  className={classes.control}
                  size="lg"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Đăng ký
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>{" "} */}
      <Feature />
      <Footer />
    </>
  );
}

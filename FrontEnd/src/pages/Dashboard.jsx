import { Title, Text, Button, Container } from "@mantine/core";
import { Dots } from "../styles/Dot";
import classes from "../styles/Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import useAccess from "../hooks/useAuth";

export function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { isLoading, logoutUser } = useAccess();
  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Tham gia iMessage{" "}
          <Text component="span" className={classes.highlight} inherit>
            để có thể
          </Text>{" "}
          trò chuyện với mọi người!
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            Chào mừng bạn đến với ứng dụng iMessage, nơi trải nghiệm nhắn tin
            trở nên liền mạch, hiện đại và đầy tiện ích. Giao tiếp là một phần
            quan trọng của cuộc sống hàng ngày và ứng dụng iMessage giúp bạn kết
            nối với bạn bè, gia đình và đồng nghiệp một cách nhanh chóng và hiệu
            quả nhất.
          </Text>
        </Container>

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
    </Container>
  );
}

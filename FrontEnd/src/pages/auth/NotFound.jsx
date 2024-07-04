import { Title, Text, Button, Container, Group } from "@mantine/core";
import classes from "../../styles/NotFound.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function NotFound() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState(null);
  useEffect(() => {
    setMode(searchParams.get("state"));
  }, searchParams);
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>
        {mode == "not-found-account"
          ? "Tài khoản của bạn chưa được đăng ký"
          : mode == "account-registered"
          ? "Tài khoản của bạn đã tồn tại"
          : "ERROR PAGE"}
        .
      </Title>
      <Text c="dimmed" size="lg" ta="center" mt={30}>
        {mode == "not-found-account"
          ? "Hãy đăng ký để sử dụng hệ thống của chúng tôi."
          : mode == "account-registered"
          ? "Vui lòng trở lại trang đăng nhập hoặc quên mật khẩu."
          : "NOT FOUND PAGE."}
      </Text>
      <Group justify="center" mt={30}>
        <Button
          variant="subtle"
          size="md"
          onClick={() => {
            navigate("/login");
          }}
        >
          {mode == "not-found-account"
            ? "Trở về trang đăng ký"
            : mode == "account-registered"
            ? "Trở về trang đăng ký"
            : "Trở về trang chủ."}
        </Button>

        {(mode == "not-found-account" || mode == "account-registered") && (
          <Button
            variant="subtle"
            size="md"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Trở về trang đăng nhập
          </Button>
        )}
      </Group>
    </Container>
  );
}

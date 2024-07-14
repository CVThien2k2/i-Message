import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  LoadingOverlay,
} from "@mantine/core";

import { GoogleButton } from "../../styles/GoogleButton";
import { FacebookButton } from "../../styles/FacebookButton";
import useAccess from "../../hooks/useAuth";
import useNotify from "../../hooks/useNotify";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { baseUrl } from "../../utils/services";

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { notifyResult } = useNotify();
  const { isLoading, loginUser, loginUserWithOAuth } = useAccess();

  useEffect(() => {
    const handleLogin = async () => {
      if (searchParams.get("token")) {
        const response = await loginUserWithOAuth({
          token: searchParams.get("token"),
        });
        if (response)
          if (response.code == 200) {
            notifyResult("Đăng nhập", response.message, true);
            navigate("/dashboard");
          } else {
            notifyResult("Đăng nhập", response.message, false);
            navigate("/login");
          }
        else navigate("/login");
      } else {
        navigate("/login");
      }
    };

    handleLogin();
  }, [searchParams, navigate]);

  const form = useForm({
    initialValues: {
      user_name: "",
      password: "",
    },
    validateInputOnBlur: true,
    validate: {
      user_name: (val) =>
        val === 0
          ? "Trường này là bắt buộc."
          : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
            /^(?:\+84|84|0[3-9])\d{8,9}$/.test(val)
          ? null
          : "Email hoặc số điện thoại không đúng định dạng",
      password: (val) =>
        val.length == 0
          ? "Trường này là bắt buộc"
          : val.length < 6
          ? "Mật khẩu chưa đủ độ dài bắt buộc (6 ký tự)"
          : null,
    },
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    let user_name = form.values.user_name;
    if (/^(?:\+84|84|0[3-9])\d{8,9}$/.test(user_name))
      if (user_name.startsWith("+")) {
        user_name = user_name.substring(1);
      } else if (user_name.startsWith("0")) {
        user_name = user_name.substring(1);
        user_name = `84${user_name}`;
      }
    const response = await loginUser({ ...form.values, user_name: user_name });
    if (response) {
      if (response.code == "200")
        notifyResult("Đăng nhập", response.message, true);
      else notifyResult("Đăng nhập", response.message, false);
    } else notifyResult("Server Error", null, false);
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <Container size={420} my={40}>
          <Title
            ta="center"
            style={{
              fontFamily: "Greycliff CF, var(--mantine-font-family)",
              fontWeight: 900,
            }}
          >
            Chào mừng tới iMessenger!
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Bạn chưa có tài khoản?{" "}
            <Anchor href="/signup" size="sm">
              Tạo mới tài khoản
            </Anchor>
          </Text>
          <Paper
            withBorder
            shadow="md"
            p={30}
            mt={30}
            radius="md"
            pos="relative"
          >
            <LoadingOverlay
              visible={isLoading}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 2 }}
            />
            <Group grow mb="md" mt="md">
              <GoogleButton
                onClick={() => {
                  window.location.href = `${baseUrl}/login/google`;
                }}
                radius="xl"
              >
                Google
              </GoogleButton>
              <FacebookButton
                radius="xl"
                onClick={() => {
                  window.location.href = `${baseUrl}/login/facebook`;
                }}
              >
                Facebook
              </FacebookButton>
            </Group>
            <TextInput
              label="Tài khoản"
              placeholder="Số điện thoại hoặc email."
              required
              {...form.getInputProps("user_name")}
            />
            <PasswordInput
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              required
              mt="md"
              {...form.getInputProps("password")}
            />

            <Group justify="space-between" mt="lg">
              <Checkbox label="Lưu đăng nhập?" />
              <Anchor size="sm" href="/forgot-password">
                Quên mật khẩu?
              </Anchor>
            </Group>
            <Button
              type="submit"
              fullWidth
              mt="xl"
              disabled={!(form.isDirty() && form.isValid())}
            >
              Đăng nhập
            </Button>
          </Paper>
        </Container>
      </form>
    </>
  );
};
export default Login;

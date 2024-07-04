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
  const { isLoading, loginUser, loginUserWithGoogle } = useAccess();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      if (searchParams.get("token")) {
        const res = await loginUserWithGoogle({
          token: searchParams.get("token"),
        });
        if (res.status) {
          navigate(`/generate-password?token=${res.metadata.token}`);
        } else {
          notifyResult("Đăng nhập", res, false);
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    handleGoogleLogin();
  }, [searchParams, navigate]);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validateInputOnBlur: true,
    validate: {
      email: (val) =>
        val === 0
          ? "Trường này là bắt buộc."
          : /^\S+@\S+$/.test(val)
          ? null
          : "Email không đúng định dạng",
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

    const errors = form.validate();
    if (errors.hasErrors) {
      notifyResult("Đăng nhập", "Vui lòng điền đúng định dạng", false);
    }
    const error = await loginUser(form.values);
    if (error) {
      notifyResult("Đăng nhập", error, false);
    } else notifyResult("Đăng nhập", "Đăng nhập thành công", true);
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

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Group grow mb="md" mt="md">
              <GoogleButton
                onClick={() => {
                  window.location.href = `${baseUrl}/login/google`;
                }}
                radius="xl"
              >
                Google
              </GoogleButton>
              <FacebookButton radius="xl">Facebook</FacebookButton>
            </Group>
            <TextInput
              label="Email"
              placeholder="yourEmail@gmail.com"
              required
              {...form.getInputProps("email")}
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
              <Anchor size="sm">Quên mật khẩu?</Anchor>
            </Group>
            <Button type="submit" fullWidth mt="xl" loading={isLoading}>
              Đăng nhập
            </Button>
          </Paper>
        </Container>
      </form>
    </>
  );
};
export default Login;

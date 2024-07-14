import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Center,
  rem,
  LoadingOverlay,
  Anchor,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "../../styles/ForgotPassword.module.css";
import { useNavigate } from "react-router-dom";
import useAccess from "../../hooks/useAuth";
import useNotify from "../../hooks/useNotify";
export function ForgotPassword() {
  const { isLoading, sendOtp } = useAccess();
  const navigate = useNavigate();
  const { notifyResult } = useNotify();
  const form = useForm({
    initialValues: {
      user_name: "",
      type: "forgot-password",
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
    },
  });
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    let user_name = form.values.user_name;
    if (/^(?:\+84|84|0[3-9])\d{8,9}$/.test(user_name))
      if (user_name.startsWith("+")) {
        user_name = user_name.substring(1);
      } else if (user_name.startsWith("0")) {
        user_name = user_name.substring(1);
        user_name = `84${user_name}`;
      }
    const response = await sendOtp({ ...form.values, user_name: user_name });
    if (response)
      if (response.code == "200") {
        notifyResult("Quên mật khẩu", response.message, true);
        navigate(
          `/verify-otp?token=${response.metadata.token}&type=forgot-password`
        );
      } else notifyResult("Quên mật khẩu", response.message, false);
    else notifyResult("ERROR SERVER", null, false);
  };
  return (
    <form onSubmit={handleForgotPassword}>
      <Container size={400} my={30}>
        <Title className={classes.title} ta="center" m={30}>
          Quên mật khẩu?
        </Title>
        <Paper
          size={400}
          withBorder
          shadow="md"
          p={30}
          radius="md"
          mt="xl"
          pos="relative"
        >
          <LoadingOverlay
            visible={isLoading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <Text c="dimmed" fz="sm" ta="center">
            Nhập email của bạn
          </Text>
          <TextInput
            label="Email"
            placeholder="Nhập email của bạn"
            required
            {...form.getInputProps("user_name")}
          />
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Center
              inline
              c="dimmed"
              size="sm"
              onClick={() => {
                navigate("/login");
              }}
            >
              <IconArrowLeft
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
              <Anchor ml={5} fz="sm" underline="hover">
                Trở lại trang đăng nhập
              </Anchor>
            </Center>
            <Button
              className={classes.control}
              type="submit"
              disabled={!(form.isDirty() && form.isValid())}
            >
              Gửi
            </Button>
          </Group>
        </Paper>
      </Container>
    </form>
  );
}

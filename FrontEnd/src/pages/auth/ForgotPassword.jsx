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
          : /^\S+@\S+$/.test(val) || /^[0-9]+$/.test(val)
          ? null
          : "Email hoặc số điện thoại không đúng định dạng",
    },
  });
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const isValid = form.validate();
    if (isValid.hasErrors) {
      return;
    }
    const response = await sendOtp(form.values);
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
      <Container size={600} my={30}>
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
              <Text ml={5} fz="sm">
                Trở lại trang đăng nhập
              </Text>
            </Center>
            <Button className={classes.control} type="submit">
              Gửi
            </Button>
          </Group>
        </Paper>
      </Container>
    </form>
  );
}

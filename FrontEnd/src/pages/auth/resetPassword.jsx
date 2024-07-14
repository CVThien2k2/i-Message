import {
  Paper,
  Title,
  Text,
  PasswordInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
  LoadingOverlay,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "../../styles/GeneratePassword.module.css";
import { useForm } from "@mantine/form";
import { useSearchParams, useNavigate } from "react-router-dom";
import useAccess from "../../hooks/useAuth";
import useNotify from "../../hooks/useNotify";
import { useEffect } from "react";
export function ResetPassword() {
  const { notifyResult } = useNotify();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoading, resetPassword } = useAccess();
  const form = useForm({
    initialValues: {
      password: "",
      repassword: "",
      token: "",
    },
    validateInputOnBlur: true,
    validate: {
      password: (val) =>
        val.length == 0
          ? "Trường này là bắt buộc"
          : val.length < 6
          ? "Mật khẩu chưa đủ độ dài bắt buộc (6 ký tự)"
          : null,
      repassword: (val, values) =>
        val === values.password ? null : "Mật khẩu không khớp",
    },
  });
  const handleReset = async (event) => {
    event.preventDefault();
    const isValid = form.validate();
    if (isValid.hasErrors) {
      return;
    }
    const { repassword, ...value } = form.values;
    const response = await resetPassword(value);
    if (response) {
      if (response.code == "200") {
        notifyResult("Đặt lại mật khẩu", response.message, true);
        navigate("/login");
      } else notifyResult("Đặt lại mật khẩu", response.message, false);
    } else notifyResult("ERROR SERVER", null, false);
  };
  useEffect(() => {
    const setParams = async () => {
      const token = searchParams.get("token");
      if (token) {
        form.setValues({
          token,
        });
      } else {
        navigate("/login");
      }
    };

    setParams();
  }, [searchParams, navigate]);
  return (
    <form onSubmit={handleReset}>
      <Container size={460} my={30}>
        <Title
          ta="center"
          style={{
            fontFamily: "Greycliff CF, var(--mantine-font-family)",
            fontWeight: 900,
          }}
        >
          Đặt lại mật khẩu.
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          Đặt lại mật khẩu của bạn.
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl" pos="relative">
          <LoadingOverlay
            visible={isLoading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <PasswordInput
            label="Mật khẩu"
            placeholder="Nhập mật khẩu mới"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Nhập lại mật khẩu"
            placeholder="Nhập lại mật khẩu mới"
            required
            mt="md"
            {...form.getInputProps("repassword")}
          />
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Anchor c="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
                <Box ml={5} onClick={() => navigate("/login")}>
                  Trở về trang đăng nhập
                </Box>
              </Center>
            </Anchor>
            <Button className={classes.control} type="submit">
              Gửi
            </Button>
          </Group>
        </Paper>
      </Container>
    </form>
  );
}

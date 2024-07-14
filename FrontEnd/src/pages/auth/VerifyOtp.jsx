import React from "react";
import {
  Title,
  PinInput,
  Paper,
  rem,
  LoadingOverlay,
  Container,
  Center,
  Button,
  Group,
  Box,
  Anchor,
} from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import useAccess from "../../hooks/useAuth";
import { useForm } from "@mantine/form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useNotify from "../../hooks/useNotify";

const VerifyOtp = () => {
  const { notifyResult } = useNotify();
  const navigate = useNavigate();
  const { isLoading, signUp, forgotPassword } = useAccess();
  const form = useForm({
    initialValues: {
      token: "",
      otp: "",
      type: "",
    },
    validateInputOnBlur: false,
    validate: {
      otp: (val) => (val.length < 6 ? "Nhập đủ mã xác thực" : null),
    },
  });
  const [searchParams] = useSearchParams();
  const handleVerify = async (e) => {
    e.preventDefault();
    const isValid = form.validate();
    if (isValid.hasErrors) {
      notifyResult("Lỗi mã xác thực", "Nhập đủ mã xác thực", true);
    } else {
      const { type, ...value } = form.values;
      if (type == "signup") {
        const response = await signUp(value);
        if (response) {
          if (response.code == "201") {
            notifyResult("Đăng ký thành công", "Đang tải trang chủ", true);
            navigate("/dashboard");
          } else {
            notifyResult("Có lỗi xảy ra", response.message, false);
          }
        } else notifyResult("Connect Error!", null, true);
      } else if (type == "forgot-password") {
        const response = await forgotPassword(value);
        if (response) {
          if (response.code == "200") {
            notifyResult("Xác minh thành công", "Đã xác minh mã OTP", true);
            navigate(`/reset-password?token=${response.metadata.token}`);
          } else notifyResult("Có lỗi xảy ra", response.message, false);
        } else notifyResult("Connect Error!", null, true);
      }
    }
  };
  useEffect(() => {
    const setParams = async () => {
      const token = searchParams.get("token");
      const type = searchParams.get("type");
      if (token && type) {
        form.setValues({
          token,
          type,
        });
      } else {
        navigate("/login");
      }
    };

    setParams();
  }, [searchParams, navigate]);
  return (
    <form onSubmit={handleVerify}>
      <Container size={400} my={40}>
        <Title
          ta="center"
          style={{
            fontFamily: "Greycliff CF, var(--mantine-font-family)",
          }}
          mt={15}
        >
          Chào mừng tới với iMessenger!
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md" pos="relative">
          <LoadingOverlay
            visible={isLoading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <Title order={2} ta={"center"} mb={30}>
            Nhập mã xác nhận
          </Title>

          <PinInput
            size="lg"
            length={6}
            type={/^[0-9]*$/}
            inputType="tel"
            inputMode="numeric"
            {...form.getInputProps("otp")}
            oneTimeCode
          />
          <Group justify="space-between" mt="lg">
            <Anchor
              c="dimmed"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              <Center inline>
                <IconArrowLeft
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
                <Box ml={5}>Back to the login page</Box>
              </Center>
            </Anchor>
            <Button
              type="submit"
              rightSection={<IconArrowRight style={{ width: rem(18) }} />}
            >
              Xác thực
            </Button>
          </Group>
        </Paper>
      </Container>
    </form>
  );
};

export default VerifyOtp;

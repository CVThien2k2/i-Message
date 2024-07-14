import React, { useState } from "react";
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
  Text,
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
  const [disabled, setDisable] = useState(true);
  const [timer, setTimer] = useState(60);
  const { isLoading, signUp, forgotPassword, resendOTP } = useAccess();
  const [searchParams] = useSearchParams();
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
  const handleResendOtp = async (e) => {
    e.preventDefault();
    if (disabled) return;
    const response = await resendOTP({ token: form.values.token });
    if (response) {
      setDisable(true);
      setTimer(60);
      if (response.code == "200") {
        notifyResult("Gửi lại mã OTP thành công", "Vui lòng nhập mã OTP", true);
      } else {
        notifyResult("Có lỗi xảy ra", response.message, false);
        navigate("/forgot-password");
      }
    }
  };
  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [disabled]);
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
          <Button
            disabled={!(form.isDirty() && form.isValid())}
            type="submit"
            fullWidth
            mt="xl"
            rightSection={<IconArrowRight style={{ width: rem(18) }} />}
          >
            Xác thực
          </Button>
          <Text c="dimmed" size="sm" ta="center" mt={15}>
            Bạn không nhận được mã?
            <Anchor
              size="sm"
              ml={5}
              onClick={(e) => {
                handleResendOtp(e);
              }}
              underline={disabled ? "never" : "hover"}
            >
              {disabled
                ? `Gửi lại mã OTP sau ${timer} giây.`
                : `Gửi lại mã OTP`}
            </Anchor>
          </Text>
        </Paper>
      </Container>
    </form>
  );
};

export default VerifyOtp;

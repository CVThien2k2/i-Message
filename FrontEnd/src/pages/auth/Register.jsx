import { useForm } from "@mantine/form";
import {
  TextInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Select,
  Divider,
  PasswordInput,
  rem,
  LoadingOverlay,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { GoogleButton } from "../../styles/GoogleButton";
import { FacebookButton } from "../../styles/FacebookButton";
import useNotify from "../../hooks/useNotify";
import useAccess from "../../hooks/useAuth";
import { baseUrl } from "../../utils/services";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const { notifyResult } = useNotify();
  const { isLoading, sendOtp } = useAccess();

  const form = useForm({
    initialValues: {
      user_name: "",
      password: "",
      given_name: "",
      family_name: "",
      doB: "",
      gender: null,
      repassword: "",
      type: "signup",
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
      password: (val) => (val.length <= 6 ? "Mật khẩu quá yếu" : null),
      given_name: (val) =>
        val.trim() !== "" ? null : "Trường này là bắt buộc",
      family_name: (val) =>
        val.trim() !== "" ? null : "Trường này là bắt buộc",
      gender: (val) => (val == null ? "Trường này là bắt buộc" : null),
      repassword: (val, values) =>
        val === values.password ? null : "Mật khẩu không khớp",
    },
  });
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { repassword, ...value } = form.values;
    value.doB = new Date(value.doB).getTime();
    let user_name = form.values.user_name;
    if (/^(?:\+84|84|0[3-9])\d{8,9}$/.test(user_name))
      if (user_name.startsWith("+")) {
        user_name = user_name.substring(1);
      } else if (user_name.startsWith("0")) {
        user_name = user_name.substring(1);
        user_name = `84${user_name}`;
      }
    const response = await sendOtp({ ...value, user_name: user_name });
    if (response)
      if (response.code == "200") {
        notifyResult("Đăng ký", response.message, true);
        navigate(`/verify-otp?token=${response.metadata.token}&type=signup`);
      } else notifyResult("Đăng ký", response.message, false);
    else notifyResult("ERROR SERVER", null, false);
  };
  return (
    <>
      <form onSubmit={handleSignUp}>
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

            <Text c="dimmed" size="sm" ta="center">
              Đăng ký tài khoản với
            </Text>
            <Group grow mb="md" mt="md">
              <GoogleButton
                radius="xl"
                onClick={() => {
                  window.location.href = `${baseUrl}/signup/google`;
                }}
              >
                Google
              </GoogleButton>
              <FacebookButton
                radius="xl"
                onClick={() => {
                  window.location.href = `${baseUrl}/signup/facebook`;
                }}
              >
                Facebook
              </FacebookButton>
            </Group>
            <Divider
              label="hoặc tiếp tục với email hoặc số điện thoại"
              labelPosition="center"
              my="lg"
            />
            <TextInput
              label="Số điện thoại hoặc email"
              placeholder="Số điện thoại hoặc email của bạn"
              required
              {...form.getInputProps("user_name")}
            />
            <Group display={"flex"}>
              <TextInput
                flex={1}
                label="Họ"
                placeholder="Họ"
                required
                {...form.getInputProps("family_name")}
              />
              <TextInput
                flex={1}
                label="Tên"
                placeholder="Tên"
                required
                {...form.getInputProps("given_name")}
              />
            </Group>
            <Group display={"flex"}>
              <Select
                flex={1}
                required
                label="Giới tính"
                placeholder="Giới tính"
                data={[
                  { value: "male", label: "Nam" },
                  { value: "female", label: "Nữ" },
                  { value: "other", label: "Khác" },
                ]}
                {...form.getInputProps("gender")}
              />
              <DateInput
                clearable
                placeholder="Ngày sinh của bạn"
                flex={1}
                defaultValue={new Date()}
                valueFormat="DD/MM/YYYY"
                label="Ngày sinh"
                {...form.getInputProps("doB")}
              />
            </Group>
            <PasswordInput
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              required
              mt="md"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              label="Nhập lại mật khẩu"
              placeholder="Nhập mật khẩu"
              required
              mt="md"
              {...form.getInputProps("repassword")}
            />

            <Button
              type="submit"
              fullWidth
              mt="xl"
              disabled={!(form.isDirty() && form.isValid())}
            >
              Đăng ký
            </Button>
            <Text c="dimmed" size="sm" ta="center" mt={15}>
              Bạn đã có tài khoản?
              <Anchor href="/login" size="sm" ml={5}>
                Đăng nhập
              </Anchor>
            </Text>
          </Paper>
        </Container>
      </form>
    </>
  );
};
export default Register;

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
  Select,
  Stack,
} from "@mantine/core";
import { GoogleButton } from "../../styles/GoogleButton";
import { FacebookButton } from "../../styles/FacebookButton";
import useNotify from "../../hooks/useNotify";
import useAccess from "../../hooks/useAuth";

const Register = () => {
  const { notifyResult } = useNotify();
  const { isLoading, signUp } = useAccess();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      name: "",
      gender: "",
      numberPhone: "",
      repassword: "",
    },
    validateInputOnBlur: true,
    validate: {
      email: (val) =>
        val === 0
          ? "Trường này là bắt buộc."
          : /^\S+@\S+$/.test(val)
          ? null
          : "Email không đúng định dạng",
      password: (val) => (val.length <= 6 ? "Mật khẩu quá yếu" : null),
      name: (val) => (val.trim() !== "" ? null : "Trường này là bắt buộc"),
      gender: (val) => (val !== null ? null : "Trường này là bắt buộc"),
      numberPhone: (val) =>
        val === ""
          ? "Trường này là bắt buộc."
          : /^\d{10,11}$/.test(val)
          ? null
          : "Số điện thoại không đúng định dạng",
      repassword: (val, values) =>
        val === values.password ? null : "Mật khẩu không khớp",
    },
  });
  const handleSignUp = async (e) => {
    e.preventDefault();
    const errors = form.validate();
    if (errors.hasErrors) {
      notifyResult("Đăng ký", "Vui lòng điền đúng định dạng", false);
    }
    // eslint-disable-next-line no-unused-vars
    const { repassword, ...value } = form.values;
    const error = await signUp(value);
    if (error) {
      notifyResult("Đăng ký", error, false);
    } else
      notifyResult(
        "Đăng ký",
        "Đăng ký thành công",
        true,
        "Đang tự chuyển tới trang chủ"
      );
  };
  return (
    <>
      <form onSubmit={handleSignUp}>
        <Container size={500} my={40}>
          <Title
            ta="center"
            style={{
              fontFamily: "Greycliff CF, var(--mantine-font-family)",
            }}
          >
            Chào mừng tới với iMessenger!
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Bạn đã có tài khoản?{" "}
            <Anchor href="/login" size="sm">
              Đăng nhập
            </Anchor>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Email"
              placeholder="yourEmail@gmail.com"
              required
              {...form.getInputProps("email")}
            />
            <Group>
              <TextInput
                label="Họ tên"
                placeholder="Họ tên"
                required
                {...form.getInputProps("name")}
              />
              <Select
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
            </Group>

            <TextInput
              label="Số điện thoại"
              placeholder="Ex: 0395797020"
              required
              {...form.getInputProps("numberPhone")}
            />
            <PasswordInput
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              required
              mt="md"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              label="Nhập lại mật khẩu"
              placeholder="Nhập lại mật khẩu"
              required
              mt="md"
              {...form.getInputProps("repassword")}
            />
            <Group justify="space-between" mt="lg">
              <Checkbox label="Chấp nhận các điều khoản." />
            </Group>
            <Button type="submit" fullWidth mt="xl" loading={isLoading}>
              Đăng ký
            </Button>
            <Stack justify="space-between" mb={30} mt={10}>
              <Text c="dimmed" size="sm" ta="center">
                Hoặc đăng ký tài khoản với{" "}
              </Text>
              <GoogleButton radius="xl">Google</GoogleButton>
              <FacebookButton radius="xl">Facebook</FacebookButton>
            </Stack>
          </Paper>
        </Container>
      </form>
    </>
  );
};
export default Register;

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
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "../../styles/GeneratePassword.module.css";
import { useForm } from "@mantine/form";
import { useSearchParams, useNavigate } from "react-router-dom";
import useAccess from "../../hooks/useAuth";
import notifyResult from "../../hooks/useNotify";

export function GeneratePassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { isLoading, generatePassword } = useAccess();
  console.log(searchParams.get("token"));
  const form = useForm({
    initialValues: {
      password: "",
      repassword: "",
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
  const handleGenerate = async (event) => {
    event.preventDefault();
    const errors = form.validate();
    if (errors.hasErrors) {
      notifyResult("Đăng nhập", "Vui lòng điền đủ thông tin", false);
    }
    const error = await generatePassword({
      token: searchParams.get("token"),
      password: form.values.password,
    });
    if (error) {
      notifyResult("Đăng nhập", error, false);
    } else notifyResult("Đăng nhập", "Đăng nhập thành công", true);
  };
  return (
    <form onSubmit={handleGenerate}>
      <Container size={460} my={30}>
        <Title
          ta="center"
          style={{
            fontFamily: "Greycliff CF, var(--mantine-font-family)",
            fontWeight: 900,
          }}
        >
          Hãy hoàn tất đăng ký để đăng nhập.
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          Tạo mật khẩu để hoàn tất đăng ký.
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
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

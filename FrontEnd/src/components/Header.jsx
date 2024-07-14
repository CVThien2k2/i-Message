import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from "@tabler/icons-react";
import classes from "../styles/Header.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import useAccess from "../hooks/useAuth";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const { isLoading, logoutUser } = useAccess();
  const navigate = useNavigate();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <MantineLogo size={30} />
          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#" className={classes.link}>
              Home
            </a>
            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a>
          </Group>
          <Group visibleFrom="sm">
            {!isAuthenticated ? (
              <>
                <Button
                  variant="default"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Log in
                </Button>
                <Button
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign up
                </Button>
              </>
            ) : (
              <Button
                variant="default"
                onClick={() => {
                  logoutUser();
                }}
              >
                Đăng xuất
              </Button>
            )}
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          <a href="#" className={classes.link}>
            Home
          </a>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>
          <Divider my="sm" />
          {!isAuthenticated ? (
            <Group justify="center" grow pb="xl" px="md">
              <Button
                variant="default"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in
              </Button>
              <Button
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign up
              </Button>
            </Group>
          ) : (
            <Button
              variant="default"
              onClick={() => {
                logoutUser();
              }}
            >
              Đăng xuất
            </Button>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
};
export default Header;

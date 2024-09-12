import { Title, Text, Button, Container } from "@mantine/core";
import { Dots } from "../styles/Dot";
import classes from "../styles/Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import useAccess from "../hooks/useAuth";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Feature from "../components/Fearture";

export function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isLoading, logoutUser } = useAccess();
  return (
    <>
      <Header />
      <Feature />
      <Footer />
    </>
  );
}

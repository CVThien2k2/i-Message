import { BrowserRouter } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useAuth } from "./context";
import { NotFound } from "./pages/auth/NotFound";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import { ResetPassword } from "./pages/auth/ResetPassword";
function App() {
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Dashboard />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route
          path={"/forgot-password"}
          element={isAuthenticated ? <Dashboard /> : <ForgotPassword />}
        />
        <Route
          path="/login/*"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
          }
        />
        <Route path="/reset-password/*" element={<ResetPassword />} />
        <Route path="/verify-otp/*" element={<VerifyOtp />} />
        <Route
          path="/not-found-account/*"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <NotFound />
          }
        />
        <Route
          path="/account-registered/*"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <NotFound />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useAuth } from "./context";
import ResetPassword from "./pages/auth/ResetPassword";
import { NotFound } from "./pages/auth/NotFound";
import VerifyOtp from "./pages/auth/VerifyOtp";
import { ForgotPassword } from "./pages/auth/ForgotPassword";

function App() {
  
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard/*" element={isAuthenticated ? <Dashboard /> : <Login />} />
        <Route path={"/forgot-password"} element={isAuthenticated ? <Dashboard /> : <ForgotPassword />} />
        <Route path="/login/*" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/reset-password/*" element={<ResetPassword />} />
        <Route path="/verify-otp/*" element={<VerifyOtp />} />
        <Route path="/not-found-account/*" element={isAuthenticated ? <Navigate to="/dashboard" /> : <NotFound />} />
        <Route path="/account-registered/*" element={isAuthenticated ? <Navigate to="/dashboard" /> : <NotFound />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

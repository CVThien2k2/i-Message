import { BrowserRouter } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useAuth } from "./context";
import { GeneratePassword } from "./pages/auth/GeneratePassword";
import { NotFound } from "./pages/auth/NotFound";
function App() {
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/dashboard"} element={<Dashboard />} />
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
        <Route
          path="/generate-password/*"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <GeneratePassword />
            )
          }
        />
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

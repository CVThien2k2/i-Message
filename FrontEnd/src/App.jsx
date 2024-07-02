import { BrowserRouter } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useAuth } from "./context";
function App() {
  const {isAuthenticated} = useAuth()
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/*"} element={!isAuthenticated?<Navigate to="/login"/>: <Navigate to="/dashboard"/>} />
        <Route path={"/dashboard"} element={!isAuthenticated?<Navigate to="/login"/>: <Dashboard />} />
        <Route path="/login" element={isAuthenticated?<Navigate to="/dashboard"/>: <Login/>} />
        <Route path="/signup" element={isAuthenticated?<Navigate to="/dashboard"/>: <Register/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

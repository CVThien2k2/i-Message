import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const storeData = JSON.parse(localStorage.getItem("user_data"));

  useEffect(() => {
    if (storeData) {
      const { tokens, user } = storeData;
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
      setUserData(user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newToken, newData) => {
    localStorage.setItem(
      "user_data",
      JSON.stringify({ tokens: newToken, user: newData })
    );
    setAccessToken(newToken.accessToken);
    setRefreshToken(newToken.refreshToken);
    setUserData(newData);
    setIsAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem("user_data");
    setAccessToken(null);
    setRefreshToken(null);
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        login,
        userData,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import { useAuth } from "../context";
import { useState } from "react";
import { baseUrl } from "../utils/services";
import services from "../utils/services";
import { useNavigate } from "react-router-dom";
const useAccess = () => {
  const navigate = useNavigate();
  const { login, userData, logout, accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(null);
  const { postRequest } = services();

  const loginUserWithOAuth = async (values) => {
    try {
      setIsLoading(true);
      const response = await postRequest(
        `${baseUrl}/oauth/login`,
        JSON.stringify(values)
      );
      if (response)
        if (response?.code == "200") {
          const { user, tokens } = response.metadata;
          login(tokens, user);
        }
      return response;
    } catch (e) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  const loginUser = async (values) => {
    try {
      setIsLoading(true);
      const response = await postRequest(
        `${baseUrl}/login`,
        JSON.stringify(values)
      );
      if (response?.code == "200") {
        const { user, tokens } = response.metadata;
        login(tokens, user);
      }
      return response;
    } catch (e) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  const signUp = async (values) => {
    try {
      setIsLoading(true);
      const response = await postRequest(
        `${baseUrl}/signup`,
        JSON.stringify(values)
      );
      if (response?.code == "201") {
        const { user, tokens } = response.metadata;
        login(tokens, user);
      }
      return response;
    } catch (e) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      setIsLoading(true);
      const response = await postRequest(
        `${baseUrl}/logout`,
        null,
        accessToken,
        userData._id
      );
      if (response?.code == "200") {
        logout();
      }
      return response;
    } catch (e) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  const sendOtp = async (value) => {
    try {
      setIsLoading(true);
      const response = await postRequest(
        `${baseUrl}/send-otp`,
        JSON.stringify(value)
      );
      return response;
    } catch (e) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  const forgotPassword = async (value) => {
    try {
      setIsLoading(true);
      const response = await postRequest(
        `${baseUrl}/forgot-password`,
        JSON.stringify(value)
      );
      return response;
    } catch (e) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  const resetPassword = async (value) => {
    try {
      setIsLoading(true);
      const response = await postRequest(
        `${baseUrl}/reset-password`,
        JSON.stringify(value)
      );
      return response;
    } catch (e) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    loginUser,
    resetPassword,
    signUp,
    logoutUser,
    loginUserWithOAuth,
    sendOtp,
    forgotPassword,
  };
};

export default useAccess;

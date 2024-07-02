export const baseUrl = "http://localhost:8081/api/v1/";
export const apiKey = "123456";

import { useAuth } from "../context";
import useNotify from "../hooks/useNotify";

const services = () => {
  const { refreshToken, login, logout } = useAuth();
  const { notifyResult } = useNotify();
  const postRequest = async (
    url,
    body,
    apiKey,
    accessToken = null,
    id = null
  ) => {
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    };

    if (accessToken) {
      headers["Authorization"] = accessToken;
    }
    if (id) {
      headers["x-client-id"] = id;
    }
    let response = await fetch(url, {
      method: "POST",
      headers: headers,
      body,
    });

    let data = await response.json();

    if (data.code == "401" && data.message == "Verify error with token!") {
      const headersRFToken = {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "x-rfresh-key": refreshToken,
        "x-client-id": id,
      };
      const tokens = await fetch(`${baseUrl}getToken`, {
        method: "POST",
        headers: headersRFToken,
        body: null,
      });
      const newData = await tokens.json();
      if (newData.code == "200") {
        const { user, tokens } = newData.metadata;
        login(tokens, user);
        headers["Authorization"] = tokens.accessToken;
        response = await fetch(url, {
          method: "POST",
          headers: headers,
          body,
        });
        data = await response.json();
      } else {
        logout();
        notifyResult("Đã hết phiên đăng nhập", "Vui lòng đăng nhập lại", false);
      }
    }
    return data;
  };
  return { postRequest };
};
export default services;

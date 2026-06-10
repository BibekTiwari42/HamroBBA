import Cookies from "js-cookie";
import api from "./api";

export const login = async (
  username: string,
  password: string
) => {
  const response = await api.post(
    "/auth/login/",
    {
      username,
      password,
    }
  );

  const { access, refresh } =
    response.data.data;

  Cookies.set(
    "access_token",
    access
  );

  Cookies.set(
    "refresh_token",
    refresh
  );

  return response.data;
};
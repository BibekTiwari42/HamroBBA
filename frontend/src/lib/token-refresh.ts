import axios from "axios";
import Cookies from "js-cookie";

export const refreshToken =
  async () => {
    const refresh =
      Cookies.get("refresh_token");

    if (!refresh) return null;
    
    try {
      const response =
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh/`,
          {
            refresh,
          }
        );

      const access =
        response.data.access;

      Cookies.set(
        "access_token",
        access
      );

      return access;
    } catch {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");

      return null;
    }
};
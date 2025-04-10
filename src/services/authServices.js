import { axiosInstance } from "../api/axiosInstance";
import { auth } from "../api/url";

export const signInService = async (email, password) => {
  try {
    const response = await axiosInstance.post(auth.login, { email, password });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutService = async () => {
  try {
    const response = await axiosInstance.get(auth.logout);
    return response.data;
  } catch (error) {
    throw error;
  }
};

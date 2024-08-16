import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

const ActionRequestResetPassword = async ({ data }) => {
  try {
    const response = await customFetch.post(
      "/auth/request-reset-password",
      data
    );
    toast.success(response.data.message);
  } catch (error) {
    toast.error(error.data.message);
  }
};

export default ActionRequestResetPassword;

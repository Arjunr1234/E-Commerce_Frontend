import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

export const useErrorHandler = () => {
  const { logout } = useAuth();

  const handleError = (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 403) {
        logout();
        toast.warning("Please login again...");
      } else if (status === 403) {
        toast.warning("Please login again...");
        console.log("Unauthorized access. Redirecting to login.");
        logout();
      }
    } else {
      console.log("An unexpected error occurred:", error);
    }
  };

  return handleError;
};

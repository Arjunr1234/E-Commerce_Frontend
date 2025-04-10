import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

export const handleError = (error, logout) => {
  if (error.response) {
    const status = error.response.status;
    if (status === 401) {
      logout();
      toast.error(error.response.data.message || "Forbidden access.");
    } else if (status === 403) {
      toast.warning("Unauthorized");
      console.log("Unauthorized access. Redirecting to login.");
      logout();
    }
  } else {
    console.log("An unexpected error occurred:", error);
  }
};

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useCheckAndProceed = () => {
  const navigate = useNavigate();

  return (callback) => {
    const user = localStorage.getItem("user");
    const authToken = localStorage.getItem("authToken");

    if (!user || !authToken) {
        toast.info("Please login to access this feature")
      navigate("/login");
    } else {
      callback(); 
    }
  };
};

export default useCheckAndProceed;

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import GlobalContext from "../utils/GlobalContext";

const ProtectedRoute = ({ children }) => {
    const { state } = useContext(GlobalContext);
    const isAuthenticated = state.user !== null;

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

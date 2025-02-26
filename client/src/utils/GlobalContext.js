import { createContext, useReducer, useEffect } from "react";

// Initial state (Load from localStorage if available)
const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
};

// Reducer function
const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("user", JSON.stringify(action.payload)); // Store in localStorage
            return { ...state, user: action.payload };
        case "LOGOUT":
            localStorage.removeItem("user"); // Remove from localStorage on logout
            return { ...state, user: null };
        default:
            return state;
    }
};

// Create Context
const GlobalContext = createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            dispatch({ type: "LOGIN", payload: storedUser });
        }
    }, []); // Runs once on mount to restore session

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;

import { AuthContext } from "../context/AuthContext"; //createContext
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error("useWorkoutsContext must be inside WorkoutsContextProvider")
    }
    return context
}
import { WorkoutContext } from "../context/WorkoutContext"; //createContext
import { useContext } from "react";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutContext)

    if (!context) {
        throw Error("useWorkoutsContext must be inside WorkoutsContextProvider")
    }
    return context
}
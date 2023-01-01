import { createContext, useReducer } from "react";

export const WorkoutContext = createContext()

export const workoutsReducer = (state, action) => { //state je object workouts: null
    switch (action.type) {
        case "SET_WORKOUTS":
            return {
                workouts: action.payload
            }
        case "CREATE_WORKOUT":
            return {
                workouts: [action.payload, ...state.workouts] //workouts spoji payload(novy workout) so spread workouts
            }
        case "DELETE_WORKOUT":
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const WorkoutsContextProvider = ({ children }) => { //children = app
    const [state,dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })
    return ( //celá appka môže používať state a dispatch keď ho importnú, teda to čo sme poslali ako value
        <WorkoutContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
}
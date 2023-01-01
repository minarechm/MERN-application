import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        localStorage.removeItem("user")//remove JWT

        dispatch({type: "LOGOUT"})
    }

    return { logout }
}
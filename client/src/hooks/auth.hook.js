import {useCallback, useEffect, useState} from "react";


export const useAuth = () => {
    const [init, setInit] = useState(false)
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem("userData", JSON.stringify({ userId: id , token: jwtToken }))
    }, [])
    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem("userData")
    }, [])

    //для того чтобы данные локал сториджа сохранялись тут в переменных
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData"))
        if (data && data.token) {
            login(data.token, data.userId)
        }
        setInit(true)
    }, [login])

    return {login, logout, token, userId, init}
}
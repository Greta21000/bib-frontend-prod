import { useState, useCallback } from "react"


export const useAuth = () => {
    const [token, setToken] = useState(false)
    const [tokenExpirationDate, setTokenExpirationDate] = useState()
    const [userId, setUserId] = useState(false)

    const login = useCallback((uid, token) => {
        setToken(token)
        setUserId(uid)
        localStorage.setItem(
            'userData',
            JSON.stringify({
                userId: uid,
                token: token
            })
        )
    })

    return {token, login, userId};
}
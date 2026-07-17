"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { loginUser, getCurrentUser } from "@/services/auth.service"
import { LoginRequest, User } from "@/types/auth"

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (data: LoginRequest) => Promise<void>;
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

interface Props {
    children: ReactNode
}

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedToken = localStorage.getItem("token")

                if (!storedToken) {
                    setLoading(false)
                    return
                }

                setToken(storedToken)

                const currentUser = await getCurrentUser(
                    storedToken
                )
                setUser(currentUser)
            }
            catch {
                localStorage.removeItem("token")
            }
            finally {
                setLoading(false)
            }
        }
        loadUser()
    }, [])


    const login = async (
        data: LoginRequest
    ) => {
        const response = await loginUser(data)

        localStorage.setItem(
            "token",
            response.access_token
        )
        setToken(response.access_token)
        const currentUser = await getCurrentUser(
            response.access_token
        )

        setUser(currentUser);
    }


    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{
            user, token, loading, isAuthenticated: !!user, login, logout
        }}> {children} </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error(
            "UseAuth must be used inside AuthProvider"
        )
    }
    return context
}
import api from "@/lib/api"
import { RegisterRequest, LoginRequest } from "@/types/auth"

export const registerUser = async ( data : RegisterRequest ) => {
    const response = await api.post("/auth/register", data)
    return response.data
}


export const loginUser = async ( data : LoginRequest ) => {
    const response = await api.post("/auth/login", data)
    return response.data
}

export const getCurrentUser = async ( token : string ) => {
    const response = await api.get("/auth/me", {
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    return response.data
}
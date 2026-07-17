"use client"

import { ReactNode } from "react"
import { AuthProvider } from "@/context/AuthContext"
import { Toaster } from "sonner"

interface Props{
    children: ReactNode
}

export default function Provider({ children }: Props){
    return(
        <AuthProvider>
            {children}
            <Toaster position="top-right" richColors />
        </AuthProvider>
    )
}
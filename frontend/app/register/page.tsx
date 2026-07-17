"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { registerSchema, RegisterFormData } from "@/lib/validators"
import { registerUser } from "@/services/auth.service"
import axios from "axios"

export default function RegisterPage(){
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const {register, handleSubmit, formState:{errors}
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data: RegisterFormData) => {
        try{
            setLoading(true)
            await registerUser(data)
            toast.success("Registration Successful",{duration:3000})
            router.push("/login")
        }
        catch (error: unknown){
            if (axios.isAxiosError(error)){
                toast.error(error.response?.data?.detail ?? "Somthing went wrong")
            }
            else{
                toast.error("Somthing went wrong")
            }
        }
    }

      return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-5"
      >
        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <div>
          <input
            type="text"
            placeholder="Full Name"
            {...register("name")}
            className="w-full border rounded-lg p-3"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full border rounded-lg p-3"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full border rounded-lg p-3"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          disabled={loading}
          className="w-full bg-black text-white rounded-lg p-3 disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </main>
  );
}
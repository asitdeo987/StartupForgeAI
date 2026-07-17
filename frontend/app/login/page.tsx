"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema, LoginFormData } from "@/lib/validators";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios"

export default function LoginPage() {
    const router = useRouter();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            setLoading(true);

            await login(data);

            toast.success("Login successful!", { duration: 3000 });

            router.push("/dashboard");
        }
        catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.detail ?? "Something went wrong");
            } else {
                toast.error("Something went wrong");
            }
        };
    }
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg space-y-5"
            >
                <h1 className="text-center text-3xl font-bold">
                    Welcome Back
                </h1>

                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                        className="w-full rounded-lg border p-3"
                    />

                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                        className="w-full rounded-lg border p-3"
                    />

                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <button
                    disabled={loading}
                    className="w-full rounded-lg bg-black p-3 text-white disabled:opacity-50"
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>
            </form>
        </main>
    );
}

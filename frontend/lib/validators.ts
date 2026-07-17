import { emit, title } from "process"
import { z } from "zod"

export const registerSchema = z.object({
    name : z.string().min(3, "Name must be at least 3 characters"),

    email : z.email("Enter a valid email address"),

    password : z.string()
    .min(8, "Passwod must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain one uppercase letter")
    .regex(/[a-z]/, "Must contain one lowercase letter")
    .regex(/[0-9]/, "Must contain one number")
})
export type RegisterFormData = z.infer<typeof registerSchema>

// ===================================================================================
export const loginSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

//===========================================================================

export const ideaSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  industry: z.string().min(1,"Please select an industry"),
  targetAudience: z.string().min(3, "Target audience is required"),
  description: z.string().min(30,"Description should be at least 30 character")
})
export type IdeaFormData = z.infer<typeof ideaSchema>

//=====================================================================================


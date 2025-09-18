
import * as Yub from "yup";
export const loginSchema =  Yub.object({
    email: Yub.string().email("Invalid email format").required("Email is required"),
    password: Yub.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

export  const registerSchema =  Yub.object({
    name: Yub.string().min(2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters").required("Name is required"),
    email: Yub.string().email("Invalid email format").required("Email is required"),
    password: Yub.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

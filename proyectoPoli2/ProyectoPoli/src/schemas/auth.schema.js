import { z } from "zod";

export const registerSchema = z.object({
    user : z.string({
        required_error: 'Username is required'
    }),
    mail: z.string({
        required_error: 'Mail is required',
    }).email({
        message : 'Invalid mail'
    }),
    password : z.string({
        required_error : 'Password is required'
    }).min(8, {
        message: 'passwors must be at least 8 characters'
    })
})
export const loginSchema = z.object({
    mail : z.string({
        required_error: 'Mail is required'
    }).email({
        message : 'Invalid mail'
    }),
    password : z.string({
        required_error : 'Password is required'
    }).min(8, {
        message: 'passwors must be at least 8 characters'
    })
})
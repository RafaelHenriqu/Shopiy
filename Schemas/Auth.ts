import { z } from 'zod'

export const LoginInput = z.object({
    email: z.email("Invalid email"),
    password: z.string("Password must be a string").min(10, "Minimum password length is 10").max(1000, "Maximum password length is 1000"),
});

export const RegisterInput = z.object({
    name: z.string("Name must be a string").min(2, "Minimum name length is 2").max(100, "Maximum name length is 100"),
    email: z.email("Invalid email"),
    password: z.string("Password must be a string").min(10, "Minimum password length is 10").max(1000, "Maximum password length is 1000"),
});
export type LoginInputType = z.infer<typeof LoginInput>
export type RegisterInputType = z.infer<typeof RegisterInput>
export const UserInputUpdate = RegisterInput.partial()
export type UserInputUpdateType = z.infer<typeof UserInputUpdate>
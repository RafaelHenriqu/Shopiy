import { type Request, type Response, type NextFunction } from "express"
import { RegisterInputType, RegisterInput, LoginInput, LoginInputType } from "../Schemas/Auth"
import { LoginService, RegisterService } from "./auth.service"

import { HttpError } from "../Utils/errors"

export async function Register(req: Request, res: Response, next: NextFunction) {
    try {
        const ZodVerify = RegisterInput.safeParse(req.body)
        if (!ZodVerify.success && typeof ZodVerify.error.issues[0]?.message === "string") { throw new HttpError(401, ZodVerify.error.issues[0]?.message, 'message') }
        await RegisterService(req.body as RegisterInputType)
        return res.status(200).json({
            type: 'message',
            message: 'User created successfully.',
            result: 'Success',
            code: 200
        })
    } catch (err) {
        next(err)
    }
}

export async function Login(req: Request, res: Response, next: NextFunction) {
    const ZodVerify = LoginInput.safeParse(req.body)
    try {
        if (!ZodVerify.success && typeof ZodVerify.error.issues[0]?.message === "string") { throw new HttpError(401, ZodVerify.error.issues[0]?.message, 'message') }
        const Token = await LoginService(req.body as LoginInputType)
        return res.status(200).cookie("Token", Token, { httpOnly: true, sameSite: "strict", secure: true }).json({
            type: 'message',
            message: 'Login done successfully',
            result: 'Success',
            code: 200
        })
    } catch (err) {
        next(err)
    }
}

export function Logout(req: Request, res: Response, next: NextFunction) {
    try {
        return res.clearCookie("Token", { httpOnly: true, sameSite: "strict", secure: true }).json({
            type: 'message',
            message: 'Logout done successfully',
            result: 'Success',
            code: 200
        })
    } catch (err) {
        next(err)
    }
} 
import { type Request, type Response, type NextFunction } from "express"
import { DeleteUserService, GetUserService, UpdateUserService } from "./user.service"
import { UserInputUpdate } from "../Schemas/Auth"
import { HttpError } from "../Utils/errors"
import { Logout } from "../Auth/auth.controller"

export async function GetUser(req: Request, res: Response, next: NextFunction) {
    try {
        const UserId = req.id
        if (typeof UserId === 'number') {
            const Data = await GetUserService({ UserId })
            return res.status(200).json(Data)
        }
    } catch (err) { next(err) }

}

export async function UpdateUser(req: Request, res: Response, next: NextFunction) {
    try {
        let body = req.body
        if (body === undefined) { throw new HttpError(401, 'body is undefined!', 'message') }
        const ZodVerify = UserInputUpdate.safeParse(body)
        if (!ZodVerify.success && typeof ZodVerify.error.issues[0]?.message === "string") { throw new HttpError(402, ZodVerify.error.issues[0]?.message, 'message') }

        const UserId = req.id
        if (typeof UserId === 'number') {
            await UpdateUserService({ req, UserId })
            return res.status(200).json({
                type: 'message',
                message: 'User updated successfully.',
                result: 'Success',
                code: 200
            })
        }
    } catch (err) { next(err) }
}

export async function DeleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const UserId = req.id
        if (typeof UserId === 'number') {
            await DeleteUserService({ UserId })
            Logout(req, res, next)
            return res.status(200).json({
                type: 'message',
                message: 'User deleted successfully.',
                result: 'Success',
                code: 200
            })
        }
    } catch (err) { next(err) }
} 
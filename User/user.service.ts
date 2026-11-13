import { type Request, type Response, type NextFunction } from "express"
import { deleteUser, getUserById, updateUserEmail, updateUserName, updateUserPassword } from "../DataBase/index"
import { HttpError } from "../Utils/errors"
import { hash, hashSync } from "bcrypt"

export async function GetUserService({ UserId }: { UserId: number }) { return getUserById.all(UserId) }


export async function UpdateUserService({ req, UserId }: { req: Request, UserId: number }) {
    const body = req.body
    let QuantityUpdate = 0

    const fun: Record<string, () => void> = {
        ["name"]: function () {
            updateUserName.run(body.name, UserId)
            QuantityUpdate++
        },

        ["password"]: async function () {
            req.body.password = hashSync(body.password, 16)
            updateUserPassword.run(body.password, UserId)
            QuantityUpdate++
        },

        ["email"]: function () {
            updateUserEmail.run(body.email, UserId)
            QuantityUpdate++
        }
    }
    for (const i in body) { if (fun[i]) { fun[i]() } }
    if (QuantityUpdate === 0) {
        throw new HttpError(401, 'No values validated without body', 'message')
    }

}

export async function DeleteUserService({ UserId }: { UserId: number }) { return deleteUser.run(UserId) }
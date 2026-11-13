import "dotenv/config"
import JWT from "jsonwebtoken"
import { HttpError } from "../Utils/errors"
import { type Request, type Response, type NextFunction } from "express"


export function CheckingJWT(req: Request, res: Response, next: NextFunction) {
    try {
        const Token = req.cookies.Token
        if (!Token) { throw new HttpError(401, 'you must be logged in to access this route!', 'message') }
        if (typeof process.env.SECRET_KEY === "string") {
            if (JWT.verify(Token, process.env.SECRET_KEY)) {
                if (!req.id) {
                    const Decode = JWT.decode(req.cookies.Token)
                    if (Decode && typeof Decode == "object" && Decode["UserId"]) { req.id = Decode["UserId"] }
                }
            }
            return next()
        }
    } catch (err) {
        if (err instanceof Error && err.name === 'TokenExpiredError') { throw new HttpError(401, 'Token Expired', 'message') }
        res.clearCookie('Token', { httpOnly: true, sameSite: "strict", secure: true })
        next(err)
    }
}

export function requireOwner(req: Request, res: Response, next: NextFunction) {
    try {
        const Token = req.cookies.Token
        if (Token.Role === "Owner"){ next() }else{ throw new HttpError(401,"access denied!",'message',"without permission") }
    } catch (err) {
        next(err)
    }
}
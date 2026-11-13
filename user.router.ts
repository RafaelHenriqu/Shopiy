import rateLimit from 'express-rate-limit';
import { DeleteUser, GetUser, UpdateUser } from "./user.controller"
import { Router } from "express";
export const UserRouter = Router()

const UserLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    statusCode: 429,
    message: {
        type: 'error',
        message: "Too many attempts. Try again in 1 minutes.",
        result: 'Rate Limited',
        code: 429
    }
});

UserRouter.route("/")
.get( UserLimiter, GetUser)
.delete( UserLimiter, DeleteUser )
.patch( UserLimiter, UpdateUser) 

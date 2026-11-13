import rateLimit from 'express-rate-limit';
import { Login, Logout, Register } from "./auth.controller"
import { Router } from "express";
export const AuthRouter = Router()

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 15,
    skipSuccessfulRequests: true,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    statusCode: 429,
    message: {
        type: 'error',
        message: "Too many attempts. Try again in 15 minutes.",
        result: 'Rate Limited',
        code: 429
    }
});

const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    statusCode: 429,
    message: {
        type: 'error',
        message: "Too many registrations. Try again later.",
        result: 'Rate Limited',
        code: 429
    }
});

const logoutLimiter = rateLimit({
    windowMs: 2.5 * 1000,
    limit: 1,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    statusCode: 429,
    message: {
        type: 'error',
        message: "Too many attempts. Try again in 2 seconds.",
        result: 'Rate Limited',
        code: 429
    }
});

AuthRouter.post("/register", loginLimiter, Register)
AuthRouter.post("/login", registerLimiter, Login)
AuthRouter.post("/logout", logoutLimiter, Logout)
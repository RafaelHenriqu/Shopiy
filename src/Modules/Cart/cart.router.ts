import { Router } from "express";
import rateLimit from 'express-rate-limit';
import { AddCart } from "./cart.controller";
import { requireOwner } from "../Middleware/Checking";
export const CartRouter = Router()

const ProductLimiter = rateLimit({
    windowMs: 5 * 1000,
    limit: 20,
    skipSuccessfulRequests: true,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    statusCode: 429,
    message: {
        type: 'error',
        message: "Too many attempts. Try again in 5 seconds.",
        result: 'Rate Limited',
        code: 429
    }
});

CartRouter.post("/:id", ProductLimiter, AddCart)
/*
CartRouter.delete("/id",ProductLimiter,Esvazia o carrinho inteiro)

CartRouter.delete("/:id", ProductLimiter, Remove 1 item do carrinho)
CartRouter.get("/", ProductLimiter, Mostra todos os produtos no carrinho do usuário)
CartRouter.patch("/:id", ProductLimiter, Atualiza a quantidade de 1 item no carrinho)



*/
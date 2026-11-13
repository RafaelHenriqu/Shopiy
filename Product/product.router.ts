import { DELETE_Product, GET_product, GET_productAll, PATCH_Product, POST_product } from "./product.controller"
import rateLimit from 'express-rate-limit';
import { Router } from "express";
import { requireOwner } from "../Middleware/Checking";
export const ProductRouter = Router()

const ProductLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 15,
    skipSuccessfulRequests: true,
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

ProductRouter.route("/").get(ProductLimiter, GET_productAll).post(requireOwner, ProductLimiter, POST_product)
ProductRouter.get("/:id", ProductLimiter, GET_product)
ProductRouter.patch("/:id", requireOwner, ProductLimiter, PATCH_Product)
ProductRouter.delete("/:id", requireOwner, ProductLimiter, DELETE_Product)

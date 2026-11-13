import { HttpError } from "../Utils/errors";
import { Request, Response, NextFunction } from 'express'
import { getAllProducts, getProductById } from "../DataBase";
import { ProductInput, productUpdate } from "../Schemas/product";
import { CreateProduct, RemoveProduct, UpdateProduct } from "./product.service";

export async function POST_product(req: Request, res: Response, next: NextFunction) {
    try {
        const ZodVerify = ProductInput.safeParse(req.body)
        if (!ZodVerify.success && typeof ZodVerify.error.issues[0]?.message === "string") { throw new HttpError(401, ZodVerify.error.issues[0]?.message, 'message') }
        CreateProduct(req.body)
        return res.status(200).json({
            type: 'message',
            message: 'Product created successfully.',
            result: 'Success',
            code: 200
        })

    } catch (err) { next(err) }
}

export function GET_productAll(req: Request, res: Response, next: NextFunction) { try { return res.status(200).json(getAllProducts.all()) } catch (err) { next(err) } }

export function GET_product(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.params.id) { throw new HttpError(400, "Invalid id", 'error') }
        if (typeof req.params.id === "string") {
            res.status(200).json(getProductById.all(req.params.id))
        }

    } catch (err) { next(err) }
}

export async function PATCH_Product(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) { throw new HttpError(400, "Invalid id", 'error') }
    if (typeof req.params.id === "string") {
        const ZodVerify = productUpdate.safeParse(req.body)
        if (!ZodVerify.success && typeof ZodVerify.error.issues[0]?.message === "string") { throw new HttpError(401, ZodVerify.error.issues[0]?.message, 'message') }
        await UpdateProduct(req.body, req.params.id)
        return res.status(200).json({
            type: 'message',
            message: 'Product updated successfully.',
            result: 'Success',
            code: 200
        })

    }
}

export async function DELETE_Product(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.params.id) { throw new HttpError(400, "Invalid id", 'error') }
        if (typeof req.params.id === "string") {
            await RemoveProduct(req.params.id)
            return res.status(200).json({
                type: 'message',
                message: 'Product removed successfully.',
                result: 'Success',
                code: 200
            })
        }
    } catch (err) {
        next(err)
    }

}
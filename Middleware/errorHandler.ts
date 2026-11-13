import { Request, Response, NextFunction } from "express"
import { HttpError } from "../Utils/errors"

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpError) {
        res.status(err.code).json({
            type: err.type,
            message: err.message,
            result: err.result,
            code: err.code,
        })
    } else {
        res.status(502).json({
            type: "error",
            message: err,
            code: 502,
        })
    }
}   
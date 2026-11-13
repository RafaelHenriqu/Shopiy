import { Request, Response, NextFunction } from 'express'
import { getProductById, getBalanceById } from '../DataBase'
import { HttpError } from '../Utils/errors'
export function AddCart(req: Request, res: Response, next: NextFunction) {
    // Verifica se o usuario tem dinheiro na conta
    // Se Tiver, Verificar Se O ID Existe,
    // Caso exista adicionar o item ao Cart do usuario com o UserID DEle E tal Bla bla bla
    try {
        const UserId = req.id
        if (!req.params.id) { throw new HttpError(400, "Invalid id", 'error') }
        if (UserId && typeof req.params.id === "string") {
            const Balance = getBalanceById.all(UserId)
            if (Balance[0] && typeof Balance[0].balance === 'string') {
                const Product = getProductById.all(req.params.id)
                const userBalance = Number(Balance[0].balance.replace("$", ""))
                if (Product[0]) {
                    if (Number(Product[0].price) >= userBalance){
                        
                    }
                }


            }

        }


    } catch (err) { next(err) }


}
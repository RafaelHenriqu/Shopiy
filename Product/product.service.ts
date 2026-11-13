import { createProduct, deleteProductById, updateProductDescription, updateProductName, updateProductPrice } from "../DataBase";
import { ProductInputType } from "../Schemas/product";
import { HttpError } from "../Utils/errors";

export function CreateProduct(body: ProductInputType) { return createProduct.run(body.name, body.description, body.price) }

export async function UpdateProduct(body: ProductInputType,ProductId:string) {
    let QuantityUpdate = 0
    const fun: Record<string, () => void> = {
        ["name"]: function () {
            updateProductName.run(body.name, ProductId)
            QuantityUpdate++
        },

        ["description"]: async function () {
            updateProductDescription.run(body.description,ProductId)
            QuantityUpdate++
        },

        ["price"]: function () {
            updateProductPrice.run(body.price, ProductId)
            QuantityUpdate++
        }
    }
    for (const i in body) { if (fun[i]) { fun[i]() } }
    if (QuantityUpdate === 0) { throw new HttpError(401, 'No values validated without body', 'message') }
}

export async function RemoveProduct(ProductId:string) { return deleteProductById.run(ProductId) }
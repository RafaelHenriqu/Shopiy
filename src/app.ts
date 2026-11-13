
import express from "express"
import cookieParser from "cookie-parser"
import {CartRouter} from './Modules/Cart/cart.router'
import { AuthRouter } from "./Modules/Auth/auth.router"
import { UserRouter } from "./Modules/User/user.router"
import { CheckingJWT } from "./Modules/Middleware/Checking"
import { errorHandler } from "./Modules/Middleware/errorHandler"
import { ProductRouter } from "./Modules/Product/product.router"
export const App = express()

App.use(express.urlencoded({ extended: true }), express.json(), cookieParser())
App.use("/auth", AuthRouter)
App.use("/user", CheckingJWT, UserRouter)
App.use("/product", CheckingJWT, ProductRouter)
App.use("/cart", CheckingJWT, CartRouter)

/*

App.use("/product")
App.use("/cart")
App.use("/admin")

*/
App.use(errorHandler)
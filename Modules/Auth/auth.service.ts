import { getUserByEmail, createUser } from "../DataBase/index"
import { RegisterInputType,LoginInputType } from "../Schemas/Auth"
import { HttpError } from "../Utils/errors"
import { hash, compare } from "bcrypt"
import JWT from "jsonwebtoken"

export async function RegisterService(body: RegisterInputType) {
    if (getUserByEmail.all(body.email).length > 0) { throw new HttpError(401, 'this User already exists!', 'message') }
    const Password = await hash(body.password, 16)
    createUser.run(body.name, body.email, Password)
}

export async function LoginService(body: LoginInputType) {
    let GetUser = getUserByEmail.all(body.email)
    if (GetUser.length < 1) { throw new HttpError(401, 'user not found!', 'message') }
    const UserSelect = GetUser[0]
    if (UserSelect && typeof UserSelect.password == 'string') {
        const Verify = await compare(body.password, UserSelect.password)
        if (Verify && process.env.SECRET_KEY) {
            return JWT.sign({ UserId: UserSelect.id,Role:UserSelect.role }, process.env.SECRET_KEY)
        } else { throw new HttpError(401, 'Invalid password!', 'message') }
    }
}
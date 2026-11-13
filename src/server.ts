// --==-- Imports --==-- //

import { App } from "./app"
import "dotenv/config"

// --==-- Starting Server --==-- //

const Server = App.listen(process.env.SERVER_PORT || 2000, (() => console.log("Shopiy inicializado!")))

// --==-- Server Error --==-- //

Server.on("error", (err: NodeJS.ErrnoException) => {
    const ServerError: Record<string, () => { type: string, message: string, status: number }> = {
        ["EADDRINUSE"]: () => {
            return { type: 'error', message: `❌ Porta ${process.env.SERVER_PORT} já está em uso.`, status: 500 }
        },
        ["EACCES"]: () => {
            return { type: 'error', message: `❌ Permissão negada na porta ${process.env.SERVER_PORT}.`, status: 500 }
        }
    }
    const Handler = ServerError[err.code ?? ""]
    Handler ? console.error(Handler()) : console.error(err)
})
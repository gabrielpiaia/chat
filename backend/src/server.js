const { WebSocketServer } = require("ws")
const dotenv = require("dotenv")

dotenv.config()


const BACKEND_PORT = process.env.BACKEND_PORT || 8081; // Permitir configuração da porta via variáveis de ambiente
const BACKEND_IP = process.env.BACKEND_IP; // Permitir configuração da porta via variáveis de ambiente

const wss = new WebSocketServer({ port: process.env.BACKEND_PORT || 7000 })

wss.on("connection", (ws) => {
    ws.userInfo = { id: "", name: "", color: "" }

    ws.on("error", console.error)

    // Recebe os dados do cliente e envia para os outros usuários a mensagem de entrada
    ws.on("message", (data) => {
        const messageData = JSON.parse(data.toString())

        // Salva os dados do usuário na conexão
        ws.userInfo = {
            id: messageData.userId,
            name: messageData.userName,
            color: messageData.userColor
        }

        // Se a mensagem for de "entrou no chat", envia aos outros clientes
        if (messageData.content.includes("entrou no chat")) {
            wss.clients.forEach((client) => {
                if (client.readyState === client.OPEN && client !== ws) {
                    client.send(JSON.stringify(messageData))
                }
            })
        } else {
            // Envia a mensagem normal do usuário para todos
            wss.clients.forEach((client) => {
                if (client.readyState === client.OPEN) {
                    client.send(data.toString())
                }
            })
        }
    })

    ws.on("close", () => {
        const disconnectMessage = {
            userId: ws.userInfo.id,
            userName: ws.userInfo.name,
            userColor: ws.userInfo.color,
            content: `${ws.userInfo.name} saiu do chat.`
        }

        wss.clients.forEach((client) => {
            if (client.readyState === client.OPEN && client !== ws) {
                client.send(JSON.stringify(disconnectMessage))
            }
        })
    })

    console.log("client connected")
})

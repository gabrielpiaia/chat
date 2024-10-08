// login elements
const login = document.querySelector(".login")
const loginForm = login.querySelector(".login__form")
const loginInput = login.querySelector(".login__input")

// chat elements
const chat = document.querySelector(".chat")
const chatForm = chat.querySelector(".chat__form")
const chatInput = chat.querySelector(".chat__input")
const chatMessages = chat.querySelector(".chat__messages")

const colors = [
    "cadetblue",
    "darkgoldenrod",
    "cornflowerblue",
    "darkkhaki",
    "hotpink",
    "gold"
]

const user = { id: "", name: "", color: "" }

let websocket

// Função para gerar um UUID
const generateUUID = () => {
    // Gera um UUID similar ao randomUUID() usando um fallback
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const createMessageSelfElement = (content) => {
    const div = document.createElement("div")

    div.classList.add("message--self")
    div.innerHTML = content

    return div
}

const createMessageOtherElement = (content, sender, senderColor) => {
    const div = document.createElement("div")
    const span = document.createElement("span")

    div.classList.add("message--other")

    span.classList.add("message--sender")
    span.style.color = senderColor

    div.appendChild(span)

    span.innerHTML = sender
    div.innerHTML += content

    return div
}

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}

const scrollScreen = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
}

const processMessage = ({ data }) => {
    const { userId, userName, userColor, content } = JSON.parse(data)

    const message =
        userId === user.id
            ? createMessageSelfElement(content)
            : createMessageOtherElement(content, userName, userColor)

    chatMessages.appendChild(message)

    scrollScreen()
}

const handleLogin = (event) => {
    event.preventDefault()

    user.id = generateUUID()  // Gera o UUID
    user.name = loginInput.value
    user.color = getRandomColor()

    login.style.display = "none"
    chat.style.display = "flex"

    // Use o nome do serviço "backend" no WebSocket em vez de "localhost"
    websocket = new WebSocket("ws://localhost:7000")

    websocket.onmessage = processMessage

    websocket.onopen = () => {
        const connectMessage = {
            userId: user.id,
            userName: user.name,
            userColor: user.color,
            content: `${user.name} entrou no chat.`
        }
        websocket.send(JSON.stringify(connectMessage))
    }

    websocket.onerror = (error) => {
        console.error('WebSocket Error: ', error)
    }

    websocket.onclose = () => {
        console.log('WebSocket connection closed');
    }
}

const sendMessage = (event) => {
    event.preventDefault()

    if (websocket.readyState === WebSocket.OPEN) {
        const message = {
            userId: user.id,
            userName: user.name,
            userColor: user.color,
            content: chatInput.value
        }

        websocket.send(JSON.stringify(message))
        chatInput.value = ""
    } else {
        console.error("WebSocket is not open: ", websocket.readyState)
    }
}

loginForm.addEventListener("submit", handleLogin)
chatForm.addEventListener("submit", sendMessage)


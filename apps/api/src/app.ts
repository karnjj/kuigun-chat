import express, { Express, Request, Response } from 'express'
import http from 'http'
import { Server } from 'socket.io'
import ChatService from './services/chatService'
import { response, send } from './helpers/response'

const app: Express = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

const port = 8000

declare module 'socket.io' {
  interface Socket {
    username: string
  }
}

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello Express + TypeScirpt!!',
  })
})

const chatService = new ChatService(io)

io.use((socket, next) => {
  const username = socket.handshake.auth.username
  if (!username) return next(new Error('Unauthorized'))
  socket.username = username as string
  next()
})

io.on('connection', (socket) => {
  chatService.login(socket, socket.username)
  send(io, 'online-users', chatService.getOnlineUsers())

  socket.on('disconnect', () => {
    chatService.logout(socket)
    send(io, 'online-users', chatService.getOnlineUsers())
  })

  socket.on('send-private-message', (data) => {
    chatService.sendPrivateMessage(socket.username, data.receiver, data.message)
  })

  socket.on('send-group-message', (data) => {
    chatService.sendGroupMessage(socket.username, data.groupId, data.message)
  })

  socket.on('create-group', (data) => {
    chatService.createGroup(data.groupId, data.name, data.color)
    send(io, 'all-groups', chatService.getAllGroupsWithOnlineCount())
    response(io, 'create-group', 'OK')
  })

  socket.on('get-all-colors', () => {
    response(io, 'get-all-colors', chatService.getAllGroupColors())
  })

  socket.on('trigger-online-users', () => {
    send(io, 'online-users', chatService.getOnlineUsers())
  })

  socket.on('trigger-all-groups', () => {
    send(io, 'all-groups', chatService.getAllGroupsWithOnlineCount())
  })

  socket.on('get-group-chat-history', (data) => {
    response(io, 'get-group-chat-history', chatService.getGroupMessages(data.groupId))
  })

  socket.on('get-private-chat-history', (data) => {
    response(io, 'get-private-chat-history', chatService.getPrivateMessages(socket.username, data.receiver))
  })
})

server.listen(port, () => console.log(`Application is running on port ${port}`))

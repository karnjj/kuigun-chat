import express, { Express, Request, Response } from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { response, send, sendRoom } from './helpers/response'
import ChatService from './services/chatService'
import { groupKey, userKey } from './helpers'

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
  send(io, 'all-groups', chatService.getAllGroupsWithOnlineCount())

  socket.on('disconnect', () => {
    chatService.logout(socket)
    send(io, 'online-users', chatService.getOnlineUsers())
    send(io, 'all-groups', chatService.getAllGroupsWithOnlineCount())
  })

  socket.on('get-last-active', (data) => {
    response(io, socket.id, 'get-last-active', chatService.getLastActive(socket.username, data.withs))
  })

  socket.on('send-private-message', (data) => {
    const message = chatService.sendPrivateMessage(socket.username, data.to, data.message)
    const userPair = chatService.getUserPair(socket.username, data.to)
    sendRoom(io, userKey(userPair), 'private-chat-history', chatService.getPrivateMessages(socket.username, data.to))
    sendRoom(io, chatService.getUserSocketIds(data.to), `private-${socket.username}-new-message`, message)
  })

  socket.on('send-group-message', (data) => {
    const message = chatService.sendGroupMessage(socket.username, data.groupId, data.message)
    sendRoom(io, groupKey(data.groupId), 'group-chat-history', chatService.getGroupMessages(data.groupId))

    const added = chatService.addGroupParticipant(data.groupId, socket.username)
    if (added) {
      send(io, `group-${data.groupId}-online-count`, chatService.getGroupOnlineCount(data.groupId))
    }
    send(io, `group-${data.groupId}-new-message`, message)
  })

  socket.on('create-group', (data) => {
    const { id } = chatService.createGroup(data.name, data.color)
    send(io, 'all-groups', chatService.getAllGroupsWithOnlineCount())
    response(io, socket.id, 'create-group', { groupId: id, status: 'OK' })
  })

  socket.on('get-all-colors', () => {
    response(io, socket.id, 'get-all-colors', chatService.getAllGroupColors())
  })

  socket.on('is-group-exist', (data) => {
    response(io, socket.id, 'is-group-exist', chatService.isGroupExist(data.groupId))
  })

  socket.on('get-group-color', (data) => {
    response(io, socket.id, 'get-group-color', chatService.getGroupColor(data.groupId))
  })

  socket.on('trigger-online-users', () => {
    send(io, 'online-users', chatService.getOnlineUsers())
  })

  socket.on('trigger-all-groups', () => {
    send(io, 'all-groups', chatService.getAllGroupsWithOnlineCount())
  })

  socket.on('trigger-group-chat-history', (data) => {
    sendRoom(io, groupKey(data.groupId), 'group-chat-history', chatService.getGroupMessages(data.groupId))
  })

  socket.on('trigger-private-chat-history', (data) => {
    const userPair = chatService.getUserPair(socket.username, data.with)
    sendRoom(io, userKey(userPair), 'private-chat-history', chatService.getPrivateMessages(socket.username, data.with))
  })

  socket.on('join-group', (data) => {
    socket.join(groupKey(data.groupId))
  })

  socket.on('leave-group', (data) => {
    socket.leave(groupKey(data.groupId))
  })

  socket.on('join-private', (data) => {
    const userPair = chatService.getUserPair(socket.username, data.with)
    socket.join(userKey(userPair))
  })

  socket.on('leave-private', (data) => {
    const userPair = chatService.getUserPair(socket.username, data.with)
    socket.leave(userKey(userPair))
  })
})

server.listen(port, () => console.log(`Application is running on port ${port}`))

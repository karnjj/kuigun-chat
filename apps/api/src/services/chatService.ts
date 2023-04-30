import { Server, Socket } from 'socket.io'
import { chatColor } from '../helpers/color'
import { randomString } from '../helpers'

type UserPair = [string, string]

interface Message {
  sender: string
  sendAt: Date
  message: string
}

interface Group {
  id: string
  name: string
  color: string
  chatHistory: Message[]
  participants: Set<string>
}

class ChatService {
  private io: Server

  private users = new Map<string, string>()
  private privateChat = new Map<string, Message[]>()
  private groups = new Map<string, Group>()

  constructor(io: Server) {
    this.io = io
  }

  getUserPair(user1: string, user2: string): UserPair {
    return [user1, user2].sort() as UserPair
  }

  getUserSocketIds(username: string) {
    return Array.from(this.users.entries())
      .filter(([, name]) => name === username)
      .map(([id]) => id)
  }

  login(socket: Socket, username: string) {
    this.users.set(socket.id, username)
    console.log(`${username} has logged in`)
  }

  logout(socket: Socket) {
    this.users.delete(socket.id)
  }

  getOnlineUsers(me?: string) {
    return Array.from(new Set(this.users.values())).map((username) => ({
      username,
      lastActive: me ? this.getPrivateMessages(me, username)?.[0]?.sendAt : undefined,
    }))
  }

  getOnlineUserCount() {
    return this.getOnlineUsers().length
  }

  getGroupColor(groupId: string) {
    const group = this.groups.get(groupId)
    return group?.color || chatColor[0]
  }

  sendPrivateMessage(sender: string, receiver: string, message: string) {
    const userPair = JSON.stringify(this.getUserPair(sender, receiver))
    const chatHistory = this.privateChat.get(userPair) || []
    const newMessage = { sender, sendAt: new Date(), message }
    chatHistory.push(newMessage)
    chatHistory.sort((a, b) => b.sendAt.getTime() - a.sendAt.getTime())
    this.privateChat.set(userPair, chatHistory)

    return newMessage
  }

  sendGroupMessage(sender: string, groupId: string, message: string) {
    const group = this.groups.get(groupId)
    if (!group) {
      throw new Error(`Group ${groupId} does not exist`)
    }
    const newMessage = { sender, sendAt: new Date(), message }
    group.chatHistory.push(newMessage)
    group.chatHistory.sort((a, b) => b.sendAt.getTime() - a.sendAt.getTime())

    return newMessage
  }

  addGroupParticipant(groupId: string, username: string) {
    if (this.users.has(username)) return false

    const group = this.groups.get(groupId)
    group?.participants.add(username)

    return true
  }

  getPrivateMessages(sender: string, receiver: string) {
    const userPair = JSON.stringify(this.getUserPair(sender, receiver))
    return this.privateChat.get(userPair)
  }

  getGroupMessages(groupId: string) {
    const group = this.groups.get(groupId)
    if (!group) {
      throw new Error(`Group ${groupId} does not exist`)
    }
    return group.chatHistory
  }

  createGroup(name: string, color: string) {
    let groupId = randomString(6)

    while (this.isGroupExist(groupId)) {
      groupId = randomString(6)
    }

    if (this.groups.has(groupId)) {
      throw new Error(`Group ${groupId} already exists`)
    }
    this.groups.set(groupId, {
      id: groupId,
      name,
      color,
      chatHistory: [],
      participants: new Set(),
    })

    return {
      id: groupId,
      name,
      color,
    }
  }

  getAllGroupsWithOnlineCount() {
    const onlineUsers = this.getOnlineUsers()
    return Array.from(this.groups.values()).map(({ id, name, chatHistory, participants }) => ({
      id,
      name,
      lastActive: chatHistory[0]?.sendAt,
      onlineCount: Array.from(participants).filter((u) => onlineUsers.find(({ username }) => username === u)).length,
    }))
  }

  getGroupOnlineCount(groupId: string) {
    const onlineUsers = this.getOnlineUsers()
    const group = this.groups.get(groupId)

    return group
      ? Array.from(group.participants).filter((u) => onlineUsers.find(({ username }) => username === u)).length
      : 0
  }

  getAllGroupColors() {
    return chatColor
  }

  isGroupExist(groupId: string) {
    return this.groups.has(groupId)
  }
}

export default ChatService

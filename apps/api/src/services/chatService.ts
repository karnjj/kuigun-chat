import { Server, Socket } from 'socket.io'
import { chatColor } from '../helpers/color'

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
  private privateChat = new Map<UserPair, Message[]>()
  private groups = new Map<string, Group>()

  constructor(io: Server) {
    this.io = io
  }

  _getUserPair(user1: string, user2: string): UserPair {
    return [user1, user2].sort() as UserPair
  }

  login(socket: Socket, username: string) {
    this.users.set(socket.id, username)
    console.log(`${username} has logged in`)
  }

  logout(socket: Socket) {
    this.users.delete(socket.id)
  }

  getOnlineUsers() {
    return Array.from(new Set(this.users.values()))
  }

  getOnlineUserCount() {
    return this.getOnlineUsers().length
  }

  sendPrivateMessage(sender: string, receiver: string, message: string) {
    const userPair = this._getUserPair(sender, receiver)
    const chatHistory = this.privateChat.get(userPair) || []
    const newMessage = { sender, sendAt: new Date(), message }
    chatHistory.push(newMessage)
    this.privateChat.set(userPair, chatHistory)
  }

  sendGroupMessage(sender: string, groupId: string, message: string) {
    const group = this.groups.get(groupId)
    if (!group) {
      throw new Error(`Group ${groupId} does not exist`)
    }
    const newMessage = { sender, sendAt: new Date(), message }
    group.chatHistory.push(newMessage)
    group.participants.add(sender)
  }

  getPrivateMessages(sender: string, receiver: string) {
    const userPair = this._getUserPair(sender, receiver)
    return this.privateChat.get(userPair) || []
  }

  getGroupMessages(groupId: string) {
    const group = this.groups.get(groupId)
    if (!group) {
      throw new Error(`Group ${groupId} does not exist`)
    }
    return group.chatHistory
  }

  createGroup(groupId: string, name: string, color: string) {
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
  }

  getAllGroupsWithOnlineCount() {
    const onlineUsers = this.getOnlineUsers()
    return Array.from(this.groups.values()).map(({ id, name, participants }) => ({
      id,
      name,
      onlineCount: Array.from(participants).filter((username) => onlineUsers.includes(username)).length,
    }))
  }

  getAllGroupColors() {
    return chatColor
  }
}

export default ChatService

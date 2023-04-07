import express, { Express, Request, Response } from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app: Express = express()
const server = http.createServer(app)
const io = new Server(server)

const port = 8000

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello Express + TypeScirpt!!',
  })
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => console.log(`Application is running on port ${port}`))

import "dotenv/config"
import connectDB from './config/db'
import express  from "express";
import cors from 'cors'
import messageRoutes from "./routes/messageRoutes";
import chatRoutes from "./routes/chatRoutes";
import userRoutes from "./routes/userRoutes"
import { Server, Socket } from "socket.io";
import { serverSocket } from "./config/socketio";
import { ClientToServerEvents, ServerToClientEvents } from "./interfaces/socketTypes";

/* SERVER STARTUP */
const app = express()
const PORT = process.env.PORT || 4000
const server = app.listen(PORT, () => {
    console.log(`Server at port ${PORT}`)
})

/* SOCKETIO CONNECTION */
const socketServer = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false,
    cors: {
        origin: '*'
    }
})

socketServer.on("connection", (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    console.log('user connected' + socket.id);
    socket.on('joinRoom', (room) => {
        console.log('user joined to room'+ room);
        socket.join(room);
    })
    socket.on('clientMsg', (data) => {
        console.log('message received ' + data.msg + ' from '+ data.room);
        socket.to(data.room).emit('serverMsg', data)   
        socket.emit('incomingMsgNotification', data)     
    })
    socket.on('clientNewChatCreated', (data) => {
        console.log(data.userOne);
        console.log(data.userTwo);
        socket.emit('serverNewChatCreated', data)
        
    })
});

/* MONGODB CONNECTION */
connectDB().then(() => {
    console.log(`DB connected`)
})

app.use(cors())
app.use(express.json())
app.use('/api', userRoutes)
app.use('/api', messageRoutes)
app.use('/api', chatRoutes)


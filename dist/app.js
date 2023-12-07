"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const db_1 = __importDefault(require("./config/db"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const socket_io_1 = require("socket.io");
/* SERVER STARTUP */
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log(`Server at port ${PORT}`);
});
/* SOCKETIO CONNECTION */
const socketServer = new socket_io_1.Server(server, {
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false,
    cors: {
        origin: '*'
    }
});
socketServer.on("connection", (socket) => {
    console.log('user connected' + socket.id);
    socket.on('joinRoom', (room) => {
        console.log('user joined to room' + room);
        socket.join(room);
    });
    socket.on('clientMsg', (data) => {
        console.log('message received ' + data.msg + ' from ' + data.room);
        socket.to(data.room).emit('serverMsg', data);
        socket.emit('incomingMsgNotification', data);
    });
    socket.on('clientNewChatCreated', (data) => {
        console.log(data.userOne);
        console.log(data.userTwo);
        socket.emit('serverNewChatCreated', data);
    });
});
/* MONGODB CONNECTION */
(0, db_1.default)().then(() => {
    console.log(`DB connected`);
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', userRoutes_1.default);
app.use('/api', messageRoutes_1.default);
app.use('/api', chatRoutes_1.default);

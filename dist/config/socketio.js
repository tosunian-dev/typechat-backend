"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverSocket = void 0;
const socket_io_1 = require("socket.io");
const uuid_1 = require("uuid");
class serverSocket {
    constructor(server) {
        this.StartListerners = (socket) => {
            console.log('Message from' + socket.id);
            socket.on('handshake', (callback) => {
                console.log('Handshake received from' + socket.id);
                const reconnected = Object.values(this.users).includes(socket.id);
                if (reconnected) {
                    const uid = this.getUidFromSocketID(socket.id);
                    const users = Object.values(this.users);
                    /*if(uid) {
                        callback(uid, users)
                        return
                    }*/
                }
                const uid = (0, uuid_1.v4)();
                this.users[uid] = socket.id;
                const users = Object.values(this.users);
                console.log('Sending callback for handshake');
                callback(uid, users);
                this.SendMessage('user_connected', users.filter(id => id !== socket.id), users);
            });
            socket.on('disconnect', () => {
                console.log('Disconnection received from' + socket.id);
            });
        };
        this.getUidFromSocketID = (id) => {
            Object.keys(this.users).find((uid) => this.users[uid] === id);
        };
        this.SendMessage = (name, users, payload) => {
            console.log('emmiting event' + name + 'to' + users);
            users.forEach(id => payload ? this.io.to(id).emit(name, payload) : this.io.to(id).emit(name));
        };
        serverSocket.instance = this;
        this.users = {};
        this.io = new socket_io_1.Server(server, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                origin: '*'
            }
        });
        this.io.on('connect', this.StartListerners);
        console.log('SocketIO running.');
    }
}
exports.serverSocket = serverSocket;

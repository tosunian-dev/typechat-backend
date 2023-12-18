import { Server as HTTPServer} from 'http'
import { Socket, Server } from 'socket.io'
import { v4 } from 'uuid'


export class serverSocket {
    public static instance: serverSocket;
    public io: Server;

    public users: {[uid: string]: string}

    constructor(server: HTTPServer) {
        serverSocket.instance = this
        this.users = {};
        this.io = new Server(server, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                origin: '*'
            }
        })

        this.io.on('connect', this.StartListerners)
        console.log('SocketIO running.');
        
    }

    StartListerners = (socket: Socket) => {
        socket.on('handshake', (callback:(uid:string, users:string[]) => void) => {
            const reconnected = Object.values(this.users).includes(socket.id)
            if(reconnected){
                const uid = this.getUidFromSocketID(socket.id)
                const users = Object.values(this.users)
            }

            const uid= v4()
            this.users[uid] = socket.id
            const users = Object.values(this.users)
            callback(uid, users)
            this.SendMessage('user_connected', users.filter(id => id !== socket.id), users )
        })
        socket.on('disconnect', () => {
        })
        
    }

    getUidFromSocketID = (id:string) => {
        Object.keys(this.users).find((uid) => this.users[uid] === id)
    }

    SendMessage = (name:string, users:string[], payload?:Object) => {
        users.forEach( id => payload ? this.io.to(id).emit(name, payload) : this.io.to(id).emit(name) )
    }
}
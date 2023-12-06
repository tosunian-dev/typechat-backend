type messageInterface = {
    sentBy: string| null,
    sentTo: string,
    chatID: string,
    msgType: string,
    text: string,
    createdAt?: string,
    date: string
}

export interface ServerToClientEvents {
    incomingMsgNotification: (data: { msg: messageInterface; room: string }) => void
    serverMsg: (data: { msg: messageInterface; room: string}) => void
    serverNewChatCreated: (roomUsers: {userOne: string|null; userTwo:string}) => void
}

export interface ClientToServerEvents {
    joinRoom: (room: string) => void
    clientMsg: (data: { msg: messageInterface; room: string}) => void
    clientNewChatCreated: (roomUsers: {userOne: string|null; userTwo:string}) => void
}
import ChatModel from "../models/chat";
import MessageModel from "../models/message";
import { Chat } from "../interfaces/chat.interface";
import { Request, Response } from 'express'
import UserModel from "../models/user";

const createChatService = async (chat: Chat) => {
    const createdChat = await ChatModel.create(chat);
    return createdChat;
}

const getChatService = async ({params}:Request) => {
    const chat = await ChatModel.find({ 
        $or: [
            { 
                $and: [
                    { userOne: params.userOne },
                    { userTwo: params.userTwo} 
                ]
            },
            { 
                $and: [ 
                    { userOne: params.userTwo },
                    { userTwo: params.userOne } 
                ] 
            } 
    ]}) 
    
    const chatId = chat.at(0)?._id
    
    /*({
        $and:[
            {userOne: params.userOne},
            {userTwo: params.userTwo}]}
    );*/
    if(chat.length >= 1){
        const messages = await MessageModel.find({ 
            $or: [
                { 
                    $and: [
                        { sentBy: params.userOne },
                        { sentTo: params.userTwo} 
                    ]
                },
                { 
                    $and: [ 
                        { sentBy: params.userTwo },
                        { sentTo: params.userOne } 
                    ] 
                } 
        ]}).sort({createdAt:-1});
        
        /*({
            $or:[
                {sentBy: params.userOne},
                {sentBy: params.userTwo},
                {sentTo: params.userOne},
                {sentTo: params.userTwo}
            ]}
        ).sort({createdAt:-1});*/



        const userTwoData = await UserModel.findById(params.userTwo)
        return {userTwoData, chatId, messages};
    } else {
        return "No chat found.";
    }
}

const deleteChatService  = async (params:string) => {
    const chat = await ChatModel.deleteOne({_id:params});
    return "Chat deleted."
}

const getChatDataService = async ({params}:Request) => {
    const chat = await ChatModel.find({
        $or:[
            {userOne: params.userOne},
            {userTwo: params.userTwo},
            {userTwo: params.userOne},
            {userOne: params.userTwo}
        ]});
    return chat
}

export {
    createChatService,
    getChatService,
    deleteChatService,
    getChatDataService
}
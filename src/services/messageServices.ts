import FileMessageModel from "../models/fileMessage";
import MessageModel from "../models/message";
import { Message } from "../interfaces/message.interface";
import { SendFile } from "../interfaces/sendfile.interface";
import { Request, Response } from 'express'
import { Params, ParamsDictionary } from "express-serve-static-core";

type getChatParams = {
    sentBy: string,
    sentTo: string
}

const sendMessageService = async (message: Message) => {
    const sentMessage = await MessageModel.create(message);
    return sentMessage;
}


const getChatMessagesService = async (params: ParamsDictionary) => {
    const messages = await MessageModel.find({ 
        '$or': [
            { 
                '$and': [
                    { sentBy: params.sentBy },
                    { sentTo: params.sentTo} 
                ]
            },
            { 
                '$and': [ 
                    { sentBy: params.sentTo },
                    { sentTo: params.sentBy } 
                ] 
            } 
    ]});

    /*const messages = await MessageModel.find({
        $and:[
            {sentBy: params.sentBy},
            {sentTo: params.sentTo}
        ]
    });*/
    
    return messages;
}

const uploadMessageFileService = async (body: SendFile) => {
    const {file_name, path, userId, file_type, sentBy, sentTo, chatID, msgType} = body
    body.text = 'filemessage'
    const text = body.text
    const file = await FileMessageModel.create({file_name, path, userId, file_type, chatID});
    const storeMessage = await MessageModel.create({
        text, 
        sentBy, 
        sentTo, 
        chatID,
        msgType
    })
    return [storeMessage, file];
}

export {
    sendMessageService,
    getChatMessagesService,
    uploadMessageFileService
}
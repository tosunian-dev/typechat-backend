import { Request, Response } from 'express'
import { handleError } from '../utils/error.handle'
import { createChatService, getChatService, deleteChatService, getChatDataService } from '../services/chatServices'

const createChat = async ({body}: Request, res: Response) => {
    try {
        const response_data = await createChatService(body);
        res.send({response_data, msg: 'CHAT_CREATED_SUCCESSFULLY'}) ;
    } catch (error) {
        handleError(res, 'ERROR_CHAT_CREATION');
    }
}

const getChat = async (req: Request, res: Response) => {
    try {
        const response_data = await getChatService(req);
        res.send({response_data, msg: 'CHAT_GET_SUCCESSFULLY'}); 
    } catch (error) {
        handleError(res, 'ERROR_GET_CHAT');
    }
}

const deleteChat = async ({params}: Request, res: Response) => {
    try {
        const response_data = await deleteChatService(params.chatID);
        res.send({msg: 'CHAT_DELETED_SUCCESSFULLY'}); 
    } catch (error) {
        handleError(res, 'ERROR_DELETE_CHAT');
    }
}

const getChatData = async (req: Request, res: Response) => {
    try {
        const response_data = await getChatDataService(req);
        res.send(response_data); 
    } catch (error) {
        handleError(res, 'ERROR_DELETE_CHAT');
    }
}

export {
    createChat,
    getChat,
    deleteChat,
    getChatData
}
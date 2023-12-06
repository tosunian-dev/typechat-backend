import { Request, Response } from 'express'
import { handleError } from '../utils/error.handle'
import {getChatMessagesService, sendMessageService, uploadMessageFileService} from '../services/messageServices'
import { RequestExtended } from '../interfaces/reqExtended.interface'
import { SendFile } from '../interfaces/sendfile.interface'


const sendMessages = async ({body}: Request, res: Response) => {
    try {
        const response_data = await sendMessageService(body)
        res.send({response_data, msg: 'MESSAGE_SENT_SUCCESSFULLY'}) 
    } catch (error) {
        handleError(res, 'ERROR_SEND_MESSAGE')
    }
}

const getChatMessages = async ({params}: Request, res: Response) => {
    try {
        const response_data = await getChatMessagesService(params)
        res.send({response_data, msg: 'MESSAGES_GET_SUCCESSFULLY'}) 
    } catch (error) {
        handleError(res, 'ERROR_GET_MESSAGES')
    }
}

const uploadMessageFile = async (req: RequestExtended, res: Response) => {
    try {
        const {user, file} = req
        const path: string = `${file?.path}`.split('\\')[4]
        const fileType = path.split('.').pop()
        const data: SendFile = {
            file_name: `${file?.filename}`,
            path,
            userId: `${user?.userId}`,
            file_type: `${fileType}`,
            msgType: 'file',
            sentTo: `${req.body.sentTo}`,
            sentBy: `${req.body.sentBy}`,
            chatID: `${req.body.chatID}`,
            text: ''
        }
        const response_data = await uploadMessageFileService(data)
        res.send({response_data, msg: 'FILE_UPLOAD_SUCCESSFULLY'}) 
    } catch (error) {
        handleError(res, 'ERROR_UPLOAD_FILE')
    }
}

export {
    sendMessages,
    getChatMessages,
    uploadMessageFile
}
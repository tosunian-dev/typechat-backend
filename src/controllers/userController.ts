import { Request, Response } from 'express'
import { handleError } from '../utils/error.handle'
import { createUserService, getUserAndChatsService, editUserService, loginUserService, uploadProfileImageService, getUserService, getUserByPhoneService, updateUserProfileImageService } from '../services/userServices'
import { ProfileImage } from '../interfaces/profile_image.interface';
import { RequestExtended } from '../interfaces/reqExtended.interface';
import { User } from '../interfaces/user.interface';
import fs from 'fs'
import path from "path";
import UserModel from '../models/user';

const createUser = async ({body}: Request, res: Response) => {
    try {
        const response_data = await createUserService(body);
        res.send({response_data, msg: 'CHAT_CREATED_SUCCESSFULLY'}) ;
    } catch (error) {
        handleError(res, 'ERROR_CHAT_CREATION');
    }
}

const editUser = async ({body}: Request, res: Response) => {
    try {
        const response_data = await editUserService(body);
        res.send({response_data, msg: 'USER_EDIT_SUCCESFULLY'})
    } catch (error) {
        handleError(res, 'ERROR_EDIT_USER');
    }
}

const getUserAndChats = async (req: Request, res: Response) => {
    try {
        const response_data = await getUserAndChatsService(req);        
        res.send({response_data, msg: 'CHAT_GET_SUCCESSFULLY'}); 
    } catch (error) {
        handleError(res, 'ERROR_GET_CHAT');
    }
}       

const getUser = async (req: Request, res: Response) => {
    try {
        const response_data = await getUserService(req); 
        res.send({response_data, msg: 'USER_GET_SUCCESSFULLY'}); 
    } catch (error) {
        handleError(res, 'ERROR_GET_USER');
    }
}

const getUserByPhone = async (req: Request, res: Response) => {
    try {
        const response_data = await getUserByPhoneService(req); 
        res.send({response_data, msg: 'USER_GET_SUCCESSFULLY'}); 
    } catch (error) {
        handleError(res, 'ERROR_GET_USER');
    }
}


const loginUser = async ({body}: Request, res: Response) => {
    try {
        const {email, password} = body;
        const response_data = await loginUserService({ email, password });
        res.send({response_data});
    } catch (error) {
        handleError(res, 'ERROR_LOGIN');
    }
}

const uploadProfileImage = async (req : RequestExtended, res: Response) => {
    try {
        const {user, file} = req
        const path: string = `${file?.path}`.split('\\')[4]
        
        const data: ProfileImage = {
            file_name: `${file?.filename}`,
            path,
            userId: `${user?.userId}`
        }
        const response_data = await uploadProfileImageService(data)

        if(response_data){
            const updatedUser = await updateUserProfileImageService(response_data)
            res.send({response_data, updatedUser})
        }
        
    } catch (error) {
        handleError(res, 'ERROR_UPLOAD_PROFILEPIC');
    }
}

const getProfileImage = async (req:Request, res:Response) => {
    const img = req.params['img']

    fs.stat('./file_storage/'+img, function(error){
        if(error){
            const imagePath = './file_storage/defaultimage.png'
            res.status(200).sendFile(path.resolve(imagePath) )
        } else {
            const imagePath = './file_storage/'+img
            res.status(200).sendFile(path.resolve(imagePath) )
        }
    })
}

export {
    createUser,
    getUserAndChats,
    editUser,
    loginUser,
    uploadProfileImage,
    getUser,
    getUserByPhone,
    getProfileImage
}
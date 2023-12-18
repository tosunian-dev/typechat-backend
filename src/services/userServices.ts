import ChatModel from "../models/chat";
import UserModel from "../models/user";
import MessageModel from "../models/message";
import { Chat } from "../interfaces/chat.interface";
import { checkAuth } from "../middlewares/authMiddleware"
import { Request, Response } from 'express'
import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import { encrypt, verify } from "../utils/pwEncrypt.handle";
import { jwtGen } from "../utils/jwtGen.handle";
import { ProfileImage } from '../interfaces/profile_image.interface';
import ProfileImageModel from '../models/profileImage';
import { ObjectId, Types } from "mongoose";
import fs from 'fs';

type imageData = {
    path:string;
    userId :string
}

const createUserService = async (authBody: User) => {
    const userExists = await UserModel.find({
        $or:[
            {email: authBody.email},
            {phone: authBody.phone}
        ]}
    );    
    if(userExists.length > 0) {
        return "USER_EXISTS"
    }
    const pwEncrypted = await encrypt(authBody.password)
    authBody.password = pwEncrypted
    const createdUser = await UserModel.create(authBody);
    return createdUser;
}

const getUserAndChatsService = async ({params}:Request) => {
    type chatObject = {
        chatId: Types.ObjectId | undefined
        userId: ObjectId | string
        name: string 
        lastMsg: string
        profileImage: string
    }
    const user = await UserModel.find({_id: params.user});   
    const user_data = user.at(0);
    
    if(user.length >= 1){
        const user_chats = await ChatModel.find({
            $or:[
                {userOne: params.user},
                {userTwo: params.user}
            ]}
        );

        const chatID = user_chats.at(0)?._id
        const chats = []
        for(const chat of user_chats){
            let chatUserName 
            let chatObj: chatObject = {
                userId: '',
                name: '',
                lastMsg: '',
                chatId: chatID,
                profileImage: ''
            }
            if(chat.userTwo === params.user){
                chatUserName = await UserModel.findOne({_id: chat.userOne})
            }
            if(chat.userOne === params.user){
                chatUserName = await UserModel.findOne({_id: chat.userTwo})
            }
            
            // GET USER PROFILE IMAGE PATH //            
            const chatLastMs = await MessageModel.find({ 
                '$or': [
                    { 
                        '$and': [
                            {sentBy: chat.userOne},
                            {sentTo: chat.userTwo}
                        ]
                    },
                    { 
                        '$and': [ 
                            {sentBy: chat.userTwo},
                            {sentTo: chat.userOne}
                        ] 
                    } 
            ]}).sort({_id:-1}).limit(1);
            
            const chatLastMsg = chatLastMs.at(0) 
               
            chatObj.userId = `${chatUserName?._id}`
            chatObj.name = `${chatUserName?.name}`
            chatObj.profileImage = `${chatUserName?.profileImage}`
            chatObj.lastMsg = `${chatLastMsg?.text}`
            chats.push(chatObj)
        }
        return {user_data, chats, chatID};
    } else {
        return "NO_USER_FOUND";
    }
}

const getUserService = async ({params}:Request) => {
    const user = await UserModel.find({_id: params.user});   
    const user_data = user.at(0);
    if(user_data === undefined) {
        return 'USER_NOT_FOUND'
    }
    return user_data
}

const getUserByPhoneService = async ({params}:Request) => {
    const user = await UserModel.find({phone: params.phone})
    const user_data = user.at(0);
    if(user_data === undefined){
        return 'USER_NOT_FOUND'
    } else{
        return user_data
    }
}

const editUserService = async (req: User) => {
    const editedUser = await UserModel.findOneAndUpdate({_id: req._id}, req, {
        new: true
    });
    return editedUser;
}

const loginUserService = async ({email, password}: Auth) => {
    const user = await UserModel.findOne({email});
    if(!user){
        return "USER_NOT_FOUND"
    };

    const pwHashed = user.password;
    const isCorrectPw = await verify(password, pwHashed);

    if(!isCorrectPw) {
        return "WRONG_PASSWORD";;
    };
    const loginToken = jwtGen(user._id.toString());
    const loginData = {
        userId: user._id.toString(),
        loginToken
    };
    
    return loginData;
}

const uploadProfileImageService = async ({file_name, path, userId} : ProfileImage) => {
    const imageExist = await ProfileImageModel.findOne({userId});
    if (imageExist === null) {
        const file = await ProfileImageModel.create({file_name, path, userId});       
        return file;
    }
    const file = await ProfileImageModel.findOneAndUpdate({userId},{file_name, path}, {new:true});
    return file;
}

const updateUserProfileImageService = async (imageData:imageData) => { 
    const prevImage = await UserModel.findById(imageData.userId)
    fs.unlink(`file_storage\\${prevImage?.profileImage}`, async (error) => {
        if(error){
            return error
        }
        const updatedUser = await UserModel.findByIdAndUpdate(imageData.userId, {profileImage: imageData.path}, {new:true})
        return updatedUser
    })
    const updatedUser = await UserModel.findByIdAndUpdate(imageData.userId, {profileImage: imageData.path}, {new:true})
    return updatedUser
}

export {
    createUserService,
    getUserAndChatsService,
    editUserService,
    loginUserService,
    uploadProfileImageService,
    getUserService,
    getUserByPhoneService,
    updateUserProfileImageService
}
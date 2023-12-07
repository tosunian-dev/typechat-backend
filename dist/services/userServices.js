"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfileImageService = exports.getUserByPhoneService = exports.getUserService = exports.uploadProfileImageService = exports.loginUserService = exports.editUserService = exports.getUserAndChatsService = exports.createUserService = void 0;
const chat_1 = __importDefault(require("../models/chat"));
const user_1 = __importDefault(require("../models/user"));
const message_1 = __importDefault(require("../models/message"));
const pwEncrypt_handle_1 = require("../utils/pwEncrypt.handle");
const jwtGen_handle_1 = require("../utils/jwtGen.handle");
const profileImage_1 = __importDefault(require("../models/profileImage"));
const createUserService = (authBody) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield user_1.default.find({
        $or: [
            { email: authBody.email },
            { phone: authBody.phone }
        ]
    });
    if (userExists.length > 0) {
        return "USER_EXISTS";
    }
    const pwEncrypted = yield (0, pwEncrypt_handle_1.encrypt)(authBody.password);
    authBody.password = pwEncrypted;
    const createdUser = yield user_1.default.create(authBody);
    return createdUser;
});
exports.createUserService = createUserService;
const getUserAndChatsService = ({ params }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_1.default.find({ _id: params.user });
    const user_data = user.at(0);
    if (user.length >= 1) {
        const user_chats = yield chat_1.default.find({
            $or: [
                { userOne: params.user },
                { userTwo: params.user }
            ]
        });
        const chatID = (_a = user_chats.at(0)) === null || _a === void 0 ? void 0 : _a._id;
        const chats = [];
        for (const chat of user_chats) {
            let chatUserName;
            let chatObj = {
                userId: '',
                name: '',
                lastMsg: '',
                chatId: chatID,
                profileImage: ''
            };
            if (chat.userTwo === params.user) {
                chatUserName = yield user_1.default.findOne({ _id: chat.userOne });
            }
            if (chat.userOne === params.user) {
                chatUserName = yield user_1.default.findOne({ _id: chat.userTwo });
            }
            // GET USER PROFILE IMAGE PATH //
            ////
            const chatLastMs = yield message_1.default.find({
                '$or': [
                    {
                        '$and': [
                            { sentBy: chat.userOne },
                            { sentTo: chat.userTwo }
                        ]
                    },
                    {
                        '$and': [
                            { sentBy: chat.userTwo },
                            { sentTo: chat.userOne }
                        ]
                    }
                ]
            }).sort({ _id: -1 }).limit(1);
            const chatLastMsg = chatLastMs.at(0);
            chatObj.userId = `${chatUserName === null || chatUserName === void 0 ? void 0 : chatUserName._id}`;
            chatObj.name = `${chatUserName === null || chatUserName === void 0 ? void 0 : chatUserName.name}`;
            chatObj.profileImage = `${chatUserName === null || chatUserName === void 0 ? void 0 : chatUserName.profileImage}`;
            chatObj.lastMsg = `${chatLastMsg === null || chatLastMsg === void 0 ? void 0 : chatLastMsg.text}`;
            chats.push(chatObj);
        }
        return { user_data, chats, chatID };
    }
    else {
        return "NO_USER_FOUND";
    }
});
exports.getUserAndChatsService = getUserAndChatsService;
const getUserService = ({ params }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.find({ _id: params.user });
    const user_data = user.at(0);
    if (user_data === undefined) {
        return 'USER_NOT_FOUND';
    }
    return user_data;
});
exports.getUserService = getUserService;
const getUserByPhoneService = ({ params }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.find({ phone: params.phone });
    const user_data = user.at(0);
    if (user_data === undefined) {
        return 'USER_NOT_FOUND';
    }
    else {
        return user_data;
    }
});
exports.getUserByPhoneService = getUserByPhoneService;
const editUserService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const editedUser = yield user_1.default.findOneAndUpdate({ _id: req._id }, req, {
        new: true
    });
    return editedUser;
});
exports.editUserService = editUserService;
const loginUserService = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        return "USER_NOT_FOUND";
    }
    ;
    const pwHashed = user.password;
    const isCorrectPw = yield (0, pwEncrypt_handle_1.verify)(password, pwHashed);
    if (!isCorrectPw) {
        return "WRONG_PASSWORD";
        ;
    }
    ;
    const loginToken = (0, jwtGen_handle_1.jwtGen)(user._id.toString());
    const loginData = {
        userId: user._id.toString(),
        loginToken
    };
    return loginData;
});
exports.loginUserService = loginUserService;
const uploadProfileImageService = ({ file_name, path, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    const imageExist = yield profileImage_1.default.findOne({ userId });
    if (imageExist === null) {
        const file = yield profileImage_1.default.create({ file_name, path, userId });
        return file;
    }
    const file = yield profileImage_1.default.findOneAndUpdate({ userId }, { file_name, path }, { new: true });
    return file;
});
exports.uploadProfileImageService = uploadProfileImageService;
const updateUserProfileImageService = (imageData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield user_1.default.findByIdAndUpdate(imageData.userId, { profileImage: imageData.path }, { new: true });
    return updatedUser;
});
exports.updateUserProfileImageService = updateUserProfileImageService;

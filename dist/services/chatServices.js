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
exports.getChatDataService = exports.deleteChatService = exports.getChatService = exports.createChatService = void 0;
const chat_1 = __importDefault(require("../models/chat"));
const message_1 = __importDefault(require("../models/message"));
const user_1 = __importDefault(require("../models/user"));
const createChatService = (chat) => __awaiter(void 0, void 0, void 0, function* () {
    const createdChat = yield chat_1.default.create(chat);
    return createdChat;
});
exports.createChatService = createChatService;
const getChatService = ({ params }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const chat = yield chat_1.default.find({
        $or: [
            {
                $and: [
                    { userOne: params.userOne },
                    { userTwo: params.userTwo }
                ]
            },
            {
                $and: [
                    { userOne: params.userTwo },
                    { userTwo: params.userOne }
                ]
            }
        ]
    });
    const chatId = (_a = chat.at(0)) === null || _a === void 0 ? void 0 : _a._id;
    /*({
        $and:[
            {userOne: params.userOne},
            {userTwo: params.userTwo}]}
    );*/
    if (chat.length >= 1) {
        const messages = yield message_1.default.find({
            $or: [
                {
                    $and: [
                        { sentBy: params.userOne },
                        { sentTo: params.userTwo }
                    ]
                },
                {
                    $and: [
                        { sentBy: params.userTwo },
                        { sentTo: params.userOne }
                    ]
                }
            ]
        }).sort({ createdAt: -1 });
        /*({
            $or:[
                {sentBy: params.userOne},
                {sentBy: params.userTwo},
                {sentTo: params.userOne},
                {sentTo: params.userTwo}
            ]}
        ).sort({createdAt:-1});*/
        const userTwoData = yield user_1.default.findById(params.userTwo);
        return { userTwoData, chatId, messages };
    }
    else {
        return "No chat found.";
    }
});
exports.getChatService = getChatService;
const deleteChatService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const chat = yield chat_1.default.deleteOne({ _id: params });
    return "Chat deleted.";
});
exports.deleteChatService = deleteChatService;
const getChatDataService = ({ params }) => __awaiter(void 0, void 0, void 0, function* () {
    const chat = yield chat_1.default.find({
        $or: [
            { userOne: params.userOne },
            { userTwo: params.userTwo },
            { userTwo: params.userOne },
            { userOne: params.userTwo }
        ]
    });
    return chat;
});
exports.getChatDataService = getChatDataService;

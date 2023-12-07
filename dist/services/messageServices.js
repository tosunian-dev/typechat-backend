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
exports.uploadMessageFileService = exports.getChatMessagesService = exports.sendMessageService = void 0;
const fileMessage_1 = __importDefault(require("../models/fileMessage"));
const message_1 = __importDefault(require("../models/message"));
const sendMessageService = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const sentMessage = yield message_1.default.create(message);
    return sentMessage;
});
exports.sendMessageService = sendMessageService;
const getChatMessagesService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield message_1.default.find({
        '$or': [
            {
                '$and': [
                    { sentBy: params.sentBy },
                    { sentTo: params.sentTo }
                ]
            },
            {
                '$and': [
                    { sentBy: params.sentTo },
                    { sentTo: params.sentBy }
                ]
            }
        ]
    });
    /*const messages = await MessageModel.find({
        $and:[
            {sentBy: params.sentBy},
            {sentTo: params.sentTo}
        ]
    });*/
    return messages;
});
exports.getChatMessagesService = getChatMessagesService;
const uploadMessageFileService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { file_name, path, userId, file_type, sentBy, sentTo, chatID, msgType } = body;
    body.text = 'filemessage';
    const text = body.text;
    const file = yield fileMessage_1.default.create({ file_name, path, userId, file_type, chatID });
    const storeMessage = yield message_1.default.create({
        text,
        sentBy,
        sentTo,
        chatID,
        msgType
    });
    return [storeMessage, file];
});
exports.uploadMessageFileService = uploadMessageFileService;

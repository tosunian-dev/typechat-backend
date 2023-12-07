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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMessageFile = exports.getChatMessages = exports.sendMessages = void 0;
const error_handle_1 = require("../utils/error.handle");
const messageServices_1 = require("../services/messageServices");
const sendMessages = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response_data = yield (0, messageServices_1.sendMessageService)(body);
        res.send({ response_data, msg: 'MESSAGE_SENT_SUCCESSFULLY' });
    }
    catch (error) {
        (0, error_handle_1.handleError)(res, 'ERROR_SEND_MESSAGE');
    }
});
exports.sendMessages = sendMessages;
const getChatMessages = ({ params }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response_data = yield (0, messageServices_1.getChatMessagesService)(params);
        res.send({ response_data, msg: 'MESSAGES_GET_SUCCESSFULLY' });
    }
    catch (error) {
        (0, error_handle_1.handleError)(res, 'ERROR_GET_MESSAGES');
    }
});
exports.getChatMessages = getChatMessages;
const uploadMessageFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, file } = req;
        const path = `${file === null || file === void 0 ? void 0 : file.path}`.split('\\')[4];
        const fileType = path.split('.').pop();
        const data = {
            file_name: `${file === null || file === void 0 ? void 0 : file.filename}`,
            path,
            userId: `${user === null || user === void 0 ? void 0 : user.userId}`,
            file_type: `${fileType}`,
            msgType: 'file',
            sentTo: `${req.body.sentTo}`,
            sentBy: `${req.body.sentBy}`,
            chatID: `${req.body.chatID}`,
            text: ''
        };
        const response_data = yield (0, messageServices_1.uploadMessageFileService)(data);
        res.send({ response_data, msg: 'FILE_UPLOAD_SUCCESSFULLY' });
    }
    catch (error) {
        (0, error_handle_1.handleError)(res, 'ERROR_UPLOAD_FILE');
    }
});
exports.uploadMessageFile = uploadMessageFile;

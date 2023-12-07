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
exports.getChatData = exports.deleteChat = exports.getChat = exports.createChat = void 0;
const error_handle_1 = require("../utils/error.handle");
const chatServices_1 = require("../services/chatServices");
const createChat = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response_data = yield (0, chatServices_1.createChatService)(body);
        res.send({ response_data, msg: 'CHAT_CREATED_SUCCESSFULLY' });
    }
    catch (error) {
        (0, error_handle_1.handleError)(res, 'ERROR_CHAT_CREATION');
    }
});
exports.createChat = createChat;
const getChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response_data = yield (0, chatServices_1.getChatService)(req);
        res.send({ response_data, msg: 'CHAT_GET_SUCCESSFULLY' });
    }
    catch (error) {
        (0, error_handle_1.handleError)(res, 'ERROR_GET_CHAT');
    }
});
exports.getChat = getChat;
const deleteChat = ({ params }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response_data = yield (0, chatServices_1.deleteChatService)(params.chatID);
        res.send({ msg: 'CHAT_DELETED_SUCCESSFULLY' });
    }
    catch (error) {
        (0, error_handle_1.handleError)(res, 'ERROR_DELETE_CHAT');
    }
});
exports.deleteChat = deleteChat;
const getChatData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response_data = yield (0, chatServices_1.getChatDataService)(req);
        res.send(response_data);
    }
    catch (error) {
        (0, error_handle_1.handleError)(res, 'ERROR_DELETE_CHAT');
    }
});
exports.getChatData = getChatData;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageController_1 = require("../controllers/messageController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const multerMiddleware_1 = __importDefault(require("../middlewares/multerMiddleware"));
const router = (0, express_1.Router)();
router.post('/messages/send', authMiddleware_1.checkAuth, messageController_1.sendMessages);
router.get('/messages/get/:sentBy/:sentTo', authMiddleware_1.checkAuth, messageController_1.getChatMessages);
router.post('/messages/upload-message-file', authMiddleware_1.checkAuth, multerMiddleware_1.default.single('file'), messageController_1.uploadMessageFile);
exports.default = router;

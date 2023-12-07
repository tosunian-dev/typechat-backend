"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: true
    },
    sentBy: {
        type: String,
        required: true
    },
    sentTo: {
        type: String,
        required: true
    },
    chatID: {
        type: String,
        required: true
    },
    msgType: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});
const MessageModel = (0, mongoose_1.model)('messages', MessageSchema);
exports.default = MessageModel;

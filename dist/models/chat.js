"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ChatSchema = new mongoose_1.Schema({
    userOne: {
        type: String,
        required: true
    },
    userTwo: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});
const ChatModel = (0, mongoose_1.model)('chats', ChatSchema);
exports.default = ChatModel;

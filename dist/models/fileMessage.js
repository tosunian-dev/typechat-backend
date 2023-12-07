"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FileMessageSchema = new mongoose_1.Schema({
    file_name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    file_type: {
        type: String,
        required: true
    },
    chatID: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});
const FileMessageModel = (0, mongoose_1.model)('file_messages', FileMessageSchema);
exports.default = FileMessageModel;

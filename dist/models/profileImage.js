"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProfileImageSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
    versionKey: false
});
const ProfileImageModel = (0, mongoose_1.model)('profile_images', ProfileImageSchema);
exports.default = ProfileImageModel;

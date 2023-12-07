"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    userInfo: {
        type: String,
        required: false,
        default: "Hi! I'm a new user."
    },
    profileImage: {
        type: String,
        required: false,
        default: 'user.png'
    }
}, {
    timestamps: true,
    versionKey: false
});
const UserModel = (0, mongoose_1.model)('users', UserSchema);
exports.default = UserModel;

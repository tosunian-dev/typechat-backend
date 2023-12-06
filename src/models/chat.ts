import { Schema, Types, model, Model } from "mongoose";
import { Chat } from "../interfaces/chat.interface";

const ChatSchema = new Schema<Chat>(
    {
        userOne: {
            type: String,
            required: true
        },
        userTwo: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const ChatModel = model('chats', ChatSchema);
export default ChatModel;

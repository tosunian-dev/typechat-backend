import { Schema, Types, model, Model } from "mongoose";
import { Message } from "../interfaces/message.interface";

const MessageSchema = new Schema<Message>(
    {
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
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const MessageModel = model('messages', MessageSchema);
export default MessageModel;










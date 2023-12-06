import { Schema, Types, model, Model } from "mongoose";
import { SendFile } from "../interfaces/sendfile.interface";

const FileMessageSchema = new Schema<SendFile>(
    {
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
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const FileMessageModel = model('file_messages', FileMessageSchema);
export default FileMessageModel;
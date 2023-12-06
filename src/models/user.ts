import { Schema, Types, model, Model } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema = new Schema<User>(
    {
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
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const UserModel = model('users', UserSchema);
export default UserModel;

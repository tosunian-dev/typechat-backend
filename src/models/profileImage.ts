import { Schema, Types, model, Model } from "mongoose";
import { ProfileImage } from "../interfaces/profile_image.interface";

const ProfileImageSchema = new Schema<ProfileImage>(
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
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const ProfileImageModel = model('profile_images', ProfileImageSchema);
export default ProfileImageModel;
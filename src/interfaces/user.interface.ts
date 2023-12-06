import { Auth } from "./auth.interface";

export interface User extends Auth {
    name: string;
    phone: number;
    userInfo: string;
    profileImage: string;
    _id?: string
}
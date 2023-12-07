"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileImage = exports.getUserByPhone = exports.getUser = exports.uploadProfileImage = exports.loginUser = exports.editUser = exports.getUserAndChats = exports.createUser = void 0;
const error_handle_1 = require("../utils/error.handle");
const userServices_1 = require("../services/userServices");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const createUser = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response_data = yield (0, userServices_1.createUserService)(body);
        res.send({ response_data, msg: 'CHAT_CREATED_SUCCESSFULLY' });
    }
    catch (error) {
        (0, error_handle_1.handleError)(res, 'ERROR_CHAT_CREATION');
    }
});
exports.createUser = createUser;
const editUser = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response_data = yield (0, userServices_1.editUserService)(body);
        res.send({ response_data, msg: 'USER_EDIT_SUCCESFULLY' });
    }
    catch (error) {
        (0, error_handle_1.handleError)(res, 'ERROR_EDIT_USER');
    }
});
exports.editUser = editUser;
const getUserAndChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response_data = yield (0, userServices_1.getUserAndChatsService)(req);
        res.send({ response_data, msg: 'CHAT_GET_SUCCESSFULLY' });
    }
    catch (error) {
        (0, error_handle_1.handleError)(res, 'ERROR_GET_CHAT');
    }
});
exports.getUserAndChats = getUserAndChats;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response_data = yield (0, userServices_1.getUserService)(req);
        res.send({ response_data, msg: 'USER_GET_SUCCESSFULLY' });
    }
    catch (error) {
        (0, error_handle_1.handleError)(res, 'ERROR_GET_USER');
    }
});
exports.getUser = getUser;
const getUserByPhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response_data = yield (0, userServices_1.getUserByPhoneService)(req);
        res.send({ response_data, msg: 'USER_GET_SUCCESSFULLY' });
    }
    catch (error) {
        (0, error_handle_1.handleError)(res, 'ERROR_GET_USER');
    }
});
exports.getUserByPhone = getUserByPhone;
const loginUser = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = body;
        const response_data = yield (0, userServices_1.loginUserService)({ email, password });
        res.send({ response_data });
    }
    catch (error) {
        (0, error_handle_1.handleError)(res, 'ERROR_LOGIN');
    }
});
exports.loginUser = loginUser;
const uploadProfileImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, file } = req;
        const path = `${file === null || file === void 0 ? void 0 : file.path}`.split('\\')[4];
        const data = {
            file_name: `${file === null || file === void 0 ? void 0 : file.filename}`,
            path,
            userId: `${user === null || user === void 0 ? void 0 : user.userId}`
        };
        const response_data = yield (0, userServices_1.uploadProfileImageService)(data);
        if (response_data) {
            const updatedUser = yield (0, userServices_1.updateUserProfileImageService)(response_data);
            res.send({ response_data, updatedUser });
        }
    }
    catch (error) {
        (0, error_handle_1.handleError)(res, 'ERROR_UPLOAD_PROFILEPIC');
    }
});
exports.uploadProfileImage = uploadProfileImage;
const getProfileImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const img = req.params['img'];
    console.log(img);
    fs_1.default.stat('./file_storage/' + img, function (error) {
        if (error) {
            const imagePath = './file_storage/defaultimage.png';
            res.status(200).sendFile(path_1.default.resolve(imagePath));
        }
        else {
            const imagePath = './file_storage/' + img;
            res.status(200).sendFile(path_1.default.resolve(imagePath));
        }
    });
});
exports.getProfileImage = getProfileImage;

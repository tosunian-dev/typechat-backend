"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const userController_1 = require("../controllers/userController");
const multerMiddleware_1 = __importDefault(require("../middlewares/multerMiddleware"));
const router = (0, express_1.Router)();
router.post('/user/create', userController_1.createUser);
router.post('/user/login', userController_1.loginUser);
router.get('/user/get/:user', authMiddleware_1.checkAuth, userController_1.getUserAndChats);
router.get('/user/getdata/:user', authMiddleware_1.checkAuth, userController_1.getUser);
router.get('/user/getbyphone/:phone', authMiddleware_1.checkAuth, userController_1.getUserByPhone);
router.post('/user/update/profile-pic', authMiddleware_1.checkAuth, multerMiddleware_1.default.single('profile-image'), userController_1.uploadProfileImage);
router.put('/user/update', authMiddleware_1.checkAuth, userController_1.editUser);
router.get('/user/getprofilepic/:img', userController_1.getProfileImage);
exports.default = router;

import { Router } from "express"
import { checkAuth } from "../middlewares/authMiddleware"
import { createUser, editUser, getUserAndChats, loginUser, uploadProfileImage, getUser, getUserByPhone, getProfileImage } from "../controllers/userController"
import multerMiddleware from "../middlewares/multerMiddleware"

const router = Router()

router.post('/user/create', createUser)
router.post('/user/login', loginUser)
router.get('/user/get/:user', checkAuth, getUserAndChats)
router.get('/user/getdata/:user', checkAuth, getUser)
router.get('/user/getbyphone/:phone', checkAuth, getUserByPhone)
router.post('/user/update/profile-pic', checkAuth, multerMiddleware.single('profile-image'), uploadProfileImage)
router.put('/user/update', checkAuth, editUser)
router.get('/user/getprofilepic/:img', getProfileImage)

export default router
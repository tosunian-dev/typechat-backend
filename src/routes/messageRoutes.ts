import { Router } from "express"
import { sendMessages, getChatMessages, uploadMessageFile } from "../controllers/messageController"
import { checkAuth } from "../middlewares/authMiddleware"
import multerMiddleware from "../middlewares/multerMiddleware"

const router = Router()

router.post('/messages/send', checkAuth, sendMessages)
router.get('/messages/get/:sentBy/:sentTo', checkAuth, getChatMessages)
router.post('/messages/upload-message-file', checkAuth, multerMiddleware.single('file'), uploadMessageFile)

export default router
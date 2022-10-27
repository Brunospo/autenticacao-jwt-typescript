import { Router } from "express"
import { UserController } from "../controllers/UserController"
import { authMiddleware } from "../middlewares/Auth"

const router = Router()

router.post("/user", new UserController().create)
router.post("/login", new UserController().login)

router.use(authMiddleware)
router.get("/profile", new UserController().getProfile)

export default router
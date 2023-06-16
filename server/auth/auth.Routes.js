import express from "express"
import { singup } from "./auth.Controller.js"

const router = express.Router()

//CREATE A USER
router.post("/signup", singup)

//SIGN IN
router.post("/signin", )

//GOOGLE AUTH
router.post("/google", )

export default router;
import express from "express"
import { deleteUser, dislike, getUser, like, subscribe, unsubcribe, update } from "./User.Controller.js";
import { verifyToken } from "../../verifyToken.js";

const router = express.Router()

//update a user
router.put("/:id", verifyToken, update)

//delete User
router.delete("/:id", verifyToken, deleteUser)

//get a User
router.get("/find/:id", getUser)

//subscribe a user
router.put("/sub/:id", verifyToken, subscribe)

//unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubcribe)

//like a video
router.put("/like/:videoId", verifyToken, like)

//dislike a video
router.put("/dislike/:videoId", verifyToken, dislike)

export default router;
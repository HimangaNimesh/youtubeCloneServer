import express from "express"
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, subs, trend, updateVideo } from "./Video.Controller.js";
import {verifyToken} from "../../verifyToken.js"

const router = express.Router()

//Create a video
router.post("/",verifyToken, addVideo)

//Update a video
router.put("/:id",verifyToken, updateVideo)

//Delete a video
router.delete("/:id",verifyToken, deleteVideo)

//Get a video
router.get("/find/:id",getVideo)

router.put("/view/:id",addView)

router.get("/trend",trend)

router.get("/random",random)

router.get("/subs",verifyToken, subs)

router.get("/tags", getByTag)

router.get("/search", search)

export default router;
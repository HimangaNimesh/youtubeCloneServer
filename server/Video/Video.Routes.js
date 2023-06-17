import express from "express"
import { addVideo, deleteVideo, getVideo, updateVideo } from "./Video.Controller.js";

const router = express.Router()

//Create a video
router.post("/", addVideo)

//Update a video
router.put("/:id",updateVideo)

//Delete a video
router.delete("/:id",deleteVideo)

//Get a video
router.get("/find/:id",getVideo)


export default router;
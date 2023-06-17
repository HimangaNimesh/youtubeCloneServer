import { createError } from "../../error.js"
import VideoModel from "./Video.Model.js"

export const addVideo = async(req, res, next) => {
    try {
        const newVideo = new VideoModel({userId: req.user.id, ...req.body})
        await newVideo.save()
        res.stasus(200).json(newVideo)
    } catch (error) {
        next(error)
    }
}

export const updateVideo = async(req, res, next) => {
    try {
        const video = await VideoModel.findById(req.params.id)
        if(!video) return next(createError(404, "Video not found!"))
        if(req.user.id=== video.id){
            const updatedVideo = await VideoModel.findByIdAndUpdate(req.params.id, {
                $set:req.body
            },
            {
                new:true
            })
            res.stasus(200).json(updatedVideo)
        }
    } catch (error) {
        next(error)
    }
}

export const deleteVideo = async(req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}

export const getVideo = async(req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}
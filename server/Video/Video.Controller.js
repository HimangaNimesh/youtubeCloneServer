import { createError } from "../../error.js"
import VideoModel from "./Video.Model.js"
import UserModel from "../User/User.Model.js"

export const addVideo = async(req, res, next) => {
    const newVideo = new VideoModel({userId: req.user.id, ...req.body})
    try {
        const savedVideo = await newVideo.save()
        res.status(200).json(savedVideo)  
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
            res.status(200).json(updatedVideo)
        }
        else{
            return next(createError(403, "You can only update your videos!"))
        }
    } catch (error) {
        next(error)
    }
}

export const deleteVideo = async(req, res, next) => {
    try {
        const video = await VideoModel.findById(req.params.id)
        if(!video) return next(createError(404, "Video not found!"))
        if(req.user.id=== video.id){
            await VideoModel.findByIdAndDelete(req.params.id)
            res.status(200).json("video has been deleted!")
        }
        else{
            return next(createError(403, "You can only delete your videos!"))
        }
    } catch (error) {
        next(error)
    }
}

export const getVideo = async(req, res, next) => {
    try {
        const video = await VideoModel.findById(req.params.id)
        res.status(200).json(video)
    } catch (error) {
        next(error)
    }
}

export const addView = async(req, res, next) => {
    try {
        await VideoModel.findByIdAndUpdate(req.params.id, {
            $inc:{views:1}
        })
        res.status(200).json("The view has been increased!")
    } catch (error) {
        next(error)
    }
}

export const random = async(req, res, next) => {
    try {
        const videos = await VideoModel.aggregate([{$sample:{size:40}}])
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

export const trend = async(req, res, next) => {
    try {
        const videos = await VideoModel.find().sort({views:-1})
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

export const subs = async(req, res, next) => {
    try {
        const user = await UserModel.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers

        const list = await Promise.all(
            subscribedChannels.map((channelId)=> {
                return VideoModel.find({userId:channelId})
            })
        )
        res.status(200).json(list.flat().sort((a,b)=>b.createdAt-a.createdAt))
    } catch (error) {
        next(error)
    }
}

export const getByTag = async(req, res, next) => {
    const tags = req.query.tags.split(",")
    try {
        const videos = await VideoModel.find({tags:{$in:tags}}).limit(20)
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

export const search = async(req, res, next) => {
    try {
        const videos = await VideoModel.find().sort({views:-1})
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}
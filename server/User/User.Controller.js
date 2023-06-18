import { createError } from "../../error.js"
import UserModel from "./User.Model.js"
import VideoModel from "../Video/Video.Model.js"

export const update = async(req, res, next) => {
    if(req.params.id === req.user.id){
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, 
            {new: true}
            )
            console.log(req.params)
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    }
    else{
        return next(createError(403, "You can only update your account!"))
    }
}

export const deleteUser = async(req, res, next) => {
    if(req.params.id === req.user.id){
        try {
            await UserModel.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted!")
        } catch (error) {
            next(error)
        }
    }
    else{
        return next(createError(403, "You can only delete your account!"))
    }
}

export const getUser = async(req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const subscribe = async(req, res, next) => {
    try {
        await UserModel.findByIdAndUpdate(req.user.id, {
            $push: {subscribedUsers:req.params.id}
        })
        await UserModel.findByIdAndUpdate(req.params.id , {
            $inc: {subscribes: 1}
        })
        res.status(200).json("Subscription successfull!")
    } catch (error) {
        next(error)
    }
}

export const unsubcribe = async(req, res, next) => {
    try {
        await UserModel.findByIdAndUpdate(req.user.id, {
            $pull: {subscribedUsers:req.params.id}
        })
        await UserModel.findByIdAndUpdate(req.params.id , {
            $inc: {subscribes: -1}
        })
        res.status(200).json("Unsubscription successfull!")
    } catch (error) {
        next(error)
    }
}

export const like = async(req, res, next) => {
    const id = req.user.id
    const videoId = req.params.videoId
    try {
        await VideoModel.findByIdAndUpdate(videoId, {
            $addToSet: {likes:id},
            $pull: {disLikes:id}
        })
        res.status(200).json("Video has been liked!")
    } catch (error) {
        next(error)
    }
}

export const dislike = async(req, res, next) => {
    const id = req.user.id
    const videoId = req.params.videoId
    try {
        await VideoModel.findByIdAndUpdate(videoId, {
            $addToSet: {disLikes:id},
            $pull: {likes:id}
        })
        res.status(200).json("Video has been disliked!")
    } catch (error) {
        next(error)
    }
}




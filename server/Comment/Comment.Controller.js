import CommentModel from "./Comment.Model.js"
import VideoModel from "../Video/Video.Model.js"
import { createError } from "../../error.js"

export const addComment = async(req, res, next) => {
    const newComment = new CommentModel({...req.body, userId:req.user.id})
    try {
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async(req, res, next) => {
    try {
        const comment = await CommentModel.findById(res.params.id)
        const video = await VideoModel.findById(res.params.id) 
        if(req.user.id === comment.userId || req.user.id === video.userId){
            await CommentModel.findByIdAndDelete(req.params.id)
            res.status(200).json("Comment has been deleted!")
        }
        else{
            return next(createError(403, "You can only delete your comments!"))
        }
    } catch (error) {
        next(error)
    }
}

export const getComments = async(req, res, next) => {
    try {
        const comments = await CommentModel.find({videoId: req.params.videoId})
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}
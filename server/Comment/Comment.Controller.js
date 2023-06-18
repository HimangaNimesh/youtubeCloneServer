import CommentModel from "./Comment.Model.js"

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
        
    } catch (error) {
        next(error)
    }
}

export const getComments = async(req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}
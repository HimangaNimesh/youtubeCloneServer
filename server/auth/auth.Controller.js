import mongoose from "mongoose"
import User from "../User/User.Model.js"
import bcryptjs from "bcryptjs"
import { createError } from "../../error.js"

export const singup = async(req, res, next) => {
    try {
        const salt = bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hashSync(req.body.password, salt)
        const newUser = new User({...req.body, password: hash})

        await newUser.save()
        res.status(200).send("User has been created!")
    } catch (error) {
       next(error)
    }
}

export const singin = async(req, res, next) => {
    try {
        const user = await User.findOne({name:req.body.name})
        if(!user) return next(createError(404, "Not found User!"))

        const isCorrect = await bcryptjs.compare(req.body.password, user.password)
        if(!isCorrect) return next(createError(400, "Wrong credencials!"))
    } catch (error) {
       next(error)
    }
}
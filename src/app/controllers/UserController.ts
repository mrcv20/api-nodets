import { Request, Response } from 'express'

import User from '../schemas/User'
const bcrypt = require('bcryptjs')
import Comment from '../schemas/Comment'

class UserController {
    public async allUsers (req: Request, res: Response): Promise<Response> {
        const users = await User.find()

        return res.json(users)
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const user = await User.create(req.body)

        return res.json(user)
    }

    public async delete (req: Request, res: Response): Promise<Response> {
        await User.findByIdAndRemove(req.params.userId)

        return res.json({user: "deleted"})
    }
}

class CommentController {
    public async allComments (req: Request, res: Response): Promise<Response> {
        const comments = await Comment.find()

        return res.json(comments)
    }

    public async create (req: Request, res: Response): Promise<Response> {
        const comment = await Comment.create(req.body)

        return res.json(comment)
    }

}

export default new UserController()
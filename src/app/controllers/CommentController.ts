import { Request, Response } from 'express'

import Comment from '../schemas/Comment'

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

export default new CommentController()
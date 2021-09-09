import { Request, Response } from 'express'

import Classe from '../schemas/Classe'
import Comment from '../schemas/Comment'

class ClasseController {
    public async allComments (req: Request, res: Response): Promise<Response> {
        try {

            const comments = await Comment.find().populate('id_class')
    
            return res.send({ comments })
            
        } catch (err) {
            console.log(err)
            return res.status(400).send({ error: "Error loading comments"})
        }
    }

    public async create_comment (req: Request, res: Response): Promise<Response> {
        try {
            const comment = await Comment.create(req.body)
    
            return res.send({ comment })
    
        } catch(err){
            return res.status(400).send({ error: "Error creating new comment "})
        }
    }
    public async delete_comment (req: Request, res: Response): Promise<Response> {
        try {
            await Comment.findByIdAndRemove(req.params.commentId)
        
            return res.send({ msg: "deleted comment " })
        } catch (err) {
            return res.status(400).send({ error: "error loading classe"})
        }
    }


    public async allClasses (req: Request, res: Response): Promise<Response> {
        try {
            const classes = await Classe.find()
    
            return res.send({ classes })
    
        } catch (err) {
            console.log(err)
            return res.status(400).send({ error: "Error loading classes"})
        }
    }

    public async create (req: Request, res: Response): Promise<Response> {
        try {
            const {name, description, video} = req.body
    
            const classe = await Classe.create({name, description, video})
    
            return res.send({ classe })
    
        } catch(err){
            return res.status(400).send({ error: "Error creating new classe"})
        }
    }

    public async put (req: Request, res: Response): Promise<Response> {
        try {
     
            const classe = await Classe.findByIdAndUpdate(
                req.body.id,
                {
                    name: req.body.name,
                    description: req.body.description,
                    video: req.body.video,
                }, {new: true})

                res.send({ classe })
        } catch(err){
            console.log(err)
            return res.status(400).send({ error: "Error updating new classe"})
        }
    }

    public async delete (req: Request, res: Response): Promise<Response> {
        try {
            await Classe.findByIdAndRemove(req.params.classeId)
        
            return res.send({ msg: "deleted" })
        } catch (err) {
            return res.status(400).send({ error: "error loading classe"})
        }
    }

    public async getOneClasse (req: Request, res: Response): Promise<Response> {
        try {
            const user = await Classe.findByIdAndRemove(req.params.classeId)
        
            return res.send({ user })
        } catch (err) {
            return res.status(400).send({ error: "error loading classe"})
        }
    }

}

export default new ClasseController()
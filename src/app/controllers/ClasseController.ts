import { Request, Response } from 'express'

import Classe from '../schemas/Classe'

class ClasseController {
    public async allClasses (req: Request, res: Response): Promise<Response> {
        const classes = await Classe.find()

        return res.json(classes)
    }

    public async create (req: Request, res: Response): Promise<Response> {
        const classe = await Classe.create(req.body)

        return res.json(classe)
    }

    public async delete (req: Request, res: Response): Promise<Response> {
        await Classe.findByIdAndRemove(req.params.classeId)

        return res.json({classe: "deleted"})
    }
}

export default new ClasseController()
import { Request, Response } from 'express'

import User from '../schemas/User'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
// hash da nossa app auth config
import authConfig from '../../config/auth.json'


// params = id.user
function generateToken(params = {}) {
    return jwt.sign({params}, authConfig.secret, {
        expiresIn: 86400,
    })
}
class UserController {
    public async allUsers (req: Request, res: Response): Promise<Response> {
        const users = await User.find()

        return res.json(users)
    }

    public async signup (req: Request, res: Response): Promise<Response> {
        const {email} = req.body
        // verificando se o usuário existe pelo email // else null
            try {
                if (await User.findOne({ email }))
                    return res.status(400).send({ error: "user already exists"})
            
            const user = await User.create(req.body)

            user.password = undefined
            
            // provide token to user login automatic
            return res.send({
                user,
                token: generateToken({id: user.id})
            })
            
            } catch (err) {
                console.log(err)
                return res.status(400).send({ error: 'Signup Failed!!'})
        }
    }

    public async delete (req: Request, res: Response): Promise<Response> {
        await User.findByIdAndRemove(req.params.userId)

        return res.json({user: "deleted"})
    }

    public async login (req: Request, res: Response): Promise<Response> {
        // recebe credenciais de login
        const {email, password} = req.body
        
        // procura email do usuario no db
        const user = await User.findOne({ email }).select('+password')

        // se user não existe
        if(!user)
            return res.status(400).send({ error: "User not found"})

        // se senha falhar na comparação com bcrypt 
        if(!await bcrypt.compare(password, user.password))
            return res.status(400).send({ error: "invalid password"})

        // removendo senha do response
        user.password = undefined
        
        // response com o usuario e o token
        res.send({ user, token: generateToken({id: user.id})})
    }

}


export default new UserController()
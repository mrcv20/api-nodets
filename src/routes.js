import { Router} from 'express'

import UserController from './app/controllers/UserController'
import ClasseController from './app/controllers/ClasseController'
import authMiddleware from './app/middlewares/auth'

const routes = Router()


routes.post('/auth/signup', UserController.signup)
routes.post('/auth/login', UserController.login)

routes.use(authMiddleware)

// USERS ROUTES
routes.get('/users', UserController.allUsers)

// COMMENTS ROUTES
routes.get('/classes/comments', ClasseController.allComments)
routes.post('/classes/comments', ClasseController.create_comment)
routes.delete('/classes/comments/:commentId', ClasseController.delete_comment)

// CLASSES ROUTES
routes.get('/classes', ClasseController.allClasses)
routes.get('/classes/:classeId', ClasseController.getOneClasse)
routes.post('/classes', ClasseController.create)
routes.put('/classes', ClasseController.put)
routes.delete('/classes/:classeId', ClasseController.delete)





export default routes
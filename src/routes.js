import { Router} from 'express'

import UserController from './app/controllers/UserController'
import ClasseController from './app/controllers/ClasseController'
import CommentController from './app/controllers/CommentController'

const routes = Router()


// USERS ROUTES
routes.get('/users', UserController.allUsers)
routes.post('/users', UserController.create)

// CLASSES ROUTES
routes.get('/classes', ClasseController.allClasses)
routes.post('/classes', ClasseController.create)
routes.delete('/classes/:classeId', ClasseController.delete)

// COMMENTS ROUTES
routes.get('/classes/comments', CommentController.allComments)
routes.post('/classes/comments', CommentController.create)


export default routes
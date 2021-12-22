import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import KuponController from '../controllers/KuponController'

const kuponRouter = Router()
const kuponController = new KuponController()

kuponRouter.use(ensureAuthenticated)

kuponRouter.post('/:promotion_id', kuponController.create)

kuponRouter.get('/', kuponController.show)

kuponRouter.patch('/:kupon_id', kuponController.update)

export default kuponRouter

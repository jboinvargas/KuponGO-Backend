import { Router } from 'express'

import ensureAuthenticated from '@modules/stores/infra/http/middlewares/ensureAuthenticated'
import ShowKuponController from '../controllers/ShowKuponController'

const showKuponRouter = Router()
const showKuponController = new ShowKuponController()

showKuponRouter.use(ensureAuthenticated)

showKuponRouter.get('/:kupon_id', showKuponController.show)

export default showKuponRouter

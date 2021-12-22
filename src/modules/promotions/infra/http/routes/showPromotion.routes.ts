import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import ShowPromotionController from '../controllers/ShowPromotionController'

const showPromotionRouter = Router()
const showPromotionController = new ShowPromotionController()

showPromotionRouter.use(ensureAuthenticated)

showPromotionRouter.get('/:promotion_id', showPromotionController.show)

export default showPromotionRouter

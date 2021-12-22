import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import { celebrate, Segments, Joi } from 'celebrate'

import ensureAuthenticated from '@modules/stores/infra/http/middlewares/ensureAuthenticated'
import ensureAuthenticatedUsers from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import PromotionsController from '../controllers/PromotionsController'
import PromotionAvatarController from '../controllers/PromotionAvatarController'

const promotionsRouter = Router()
const promotionsController = new PromotionsController()
const promotionAvatarController = new PromotionAvatarController()

const upload = multer(uploadConfig.multer)

promotionsRouter.get(
  '/:store_id',
  promotionsController.show,
  ensureAuthenticatedUsers,
)

promotionsRouter.use(ensureAuthenticated)

promotionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      start_time: Joi.date().required(),
      finish_time: Joi.date().required(),
      product_price: Joi.number().required(),
      product_discount: Joi.number().required(),
      quantity: Joi.number().required(),
    },
  }),
  promotionsController.create,
)

promotionsRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  promotionAvatarController.update,
)

export default promotionsRouter

import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import { celebrate, Segments, Joi } from 'celebrate'

import StoresController from '../controllers/StoresController'
import StoreAvatarController from '../controllers/StoreAvatarController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const storesRouter = Router()
const storesController = new StoresController()
const storeAvatarController = new StoreAvatarController()

const upload = multer(uploadConfig.multer)

storesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    },
  }),
  storesController.create,
)

storesRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  storeAvatarController.update,
)

storesRouter.get('/', storesController.show)

export default storesRouter

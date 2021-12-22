import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ProfileStoreController from '../controllers/ProfileStoreController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const profileStoresRouter = Router()
const profileStoreController = new ProfileStoreController()

profileStoresRouter.use(ensureAuthenticated)

profileStoresRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      // email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
      cnpj: Joi.string().required(),
      zip_code: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      district: Joi.string().required(),
      street: Joi.string().required(),
      number: Joi.string().required(),
      phone: Joi.string().required(),
      status: Joi.string().required(),
      opening_hours: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    },
  }),
  profileStoreController.update,
)

export default profileStoresRouter

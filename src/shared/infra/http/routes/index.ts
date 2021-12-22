import { Router } from 'express'

import usersRouter from '@modules/users/infra/http/routes/users.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import passwordRouter from '@modules/users/infra/http/routes/password.routes'
import profileRouter from '@modules/users/infra/http/routes/profile.routes'

import storesRouter from '@modules/stores/infra/http/routes/stores.routes'
import employeesRouter from '@modules/stores/infra/http/routes/employees.routes'
import sessionsStoreRouter from '@modules/stores/infra/http/routes/sessions.routes'
import profileStoreRouter from '@modules/stores/infra/http/routes/profileStore.routes'

import promotionsRouter from '@modules/promotions/infra/http/routes/promotions.routes'
import showPromotionRouter from '@modules/promotions/infra/http/routes/showPromotion.routes'
import showKuponRouter from '@modules/promotions/infra/http/routes/showKupon.routes'
import catchKuponRouter from '@modules/promotions/infra/http/routes/catchKupon.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)

routes.use('/stores', storesRouter)
routes.use('/employees', employeesRouter)
routes.use('/sessionsStore', sessionsStoreRouter)
routes.use('/profileStore', profileStoreRouter)

routes.use('/promotions', promotionsRouter)
routes.use('/showPromotion', showPromotionRouter)
routes.use('/showKupon', showKuponRouter)
routes.use('/kupons', catchKuponRouter)

export default routes

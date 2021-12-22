import { container } from 'tsyringe'

import '@modules/users/providers'
import './providers'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

import IStoresRepository from '@modules/stores/repositories/IStoresRepository'
import StoresRepository from '@modules/stores/infra/typeorm/repositories/StoresRepository'

import IEmployeesRepository from '@modules/stores/repositories/IEmployeesRepository'
import EmployeesRepository from '@modules/stores/infra/typeorm/repositories/EmployeesRepository'

import IPromotionsRepository from '@modules/promotions/repositories/IPromotionsRepository'
import PromotionsRepository from '@modules/promotions/infra/typeorm/repositories/PromotionsRepository'

import IKuponsRepository from '@modules/promotions/repositories/IKuponsRepository'
import KuponsRepository from '@modules/promotions/infra/typeorm/repositories/KuponsRepository'

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository'

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<IStoresRepository>(
  'StoresRepository',
  StoresRepository,
)

container.registerSingleton<IEmployeesRepository>(
  'EmployeesRepository',
  EmployeesRepository,
)

container.registerSingleton<IPromotionsRepository>(
  'PromotionsRepository',
  PromotionsRepository,
)

container.registerSingleton<IKuponsRepository>(
  'KuponsRepository',
  KuponsRepository,
)

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
)

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
)

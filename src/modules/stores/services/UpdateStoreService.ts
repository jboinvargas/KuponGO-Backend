import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IStoresRepository from '../repositories/IStoresRepository'

import Store from '../infra/typeorm/entities/Store'

interface IRequest {
  store_id: string
  name: string
  // email: string
  // old_password?: string
  // password?: string
  cnpj: string
  zip_code: string
  state: string
  city: string
  district: string
  street: string
  number: string
  phone: string
  status: string
  opening_hours: string
  latitude: number
  longitude: number
}

@injectable()
class UpdateStoreService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    store_id,
    name,
    // email,
    // old_password,
    // password,
    cnpj,
    zip_code,
    state,
    city,
    district,
    street,
    number,
    phone,
    status,
    opening_hours,
    latitude,
    longitude,
  }: IRequest): Promise<Store> {
    const store = await this.storesRepository.findById(store_id)

    if (!store) {
      throw new AppError('Store not found')
    }

    // const storeWithUpdatedEmail = await this.storesRepository.findByEmail(email)

    // if (storeWithUpdatedEmail && storeWithUpdatedEmail.id !== store_id) {
    //   throw new AppError('E-mail already in use')
    // }

    store.name = name
    store.cnpj = cnpj
    store.zip_code = zip_code
    store.state = state
    store.city = city
    store.district = district
    store.street = street
    store.number = number
    store.phone = phone
    store.status = status
    store.opening_hours = opening_hours
    store.latitude = latitude
    store.longitude = longitude

    // if (password && !old_password) {
    //   throw new AppError(
    //     'You need to inform the old password to set a new password.',
    //   )
    // }

    // if (password && old_password) {
    //   const checkOldPassword = await this.hashProvider.compareHash(
    //     old_password,
    //     store.password,
    //   )

    //   if (!checkOldPassword) {
    //     throw new AppError('Old password does not match.')
    //   }

    //   store.password = await this.hashProvider.generateHash(password)
    // }

    return this.storesRepository.save(store)
  }
}

export default UpdateStoreService

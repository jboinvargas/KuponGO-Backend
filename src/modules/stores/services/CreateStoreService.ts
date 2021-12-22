import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import IStoresRepository from '../repositories/IStoresRepository'
import IEmployeesRepository from '../repositories/IEmployeesRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

import Store from '../infra/typeorm/entities/Store'
import Employee from '../infra/typeorm/entities/Employee'

interface IRequest {
  name: string
  email: string
  password: string
  latitude: number
  longitude: number
}

interface IResponse {
  store: Store
  employee: Employee
}

@injectable()
class CreateStoreService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,

    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    latitude,
    longitude,
  }: IRequest): Promise<IResponse> {
    const checkStoreExists = await this.employeesRepository.findByEmail(email)

    if (checkStoreExists) {
      throw new AppError('Email address already used.')
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const store = await this.storesRepository.create({
      name,
      latitude,
      longitude,
    })

    const employee = await this.employeesRepository.create({
      store_id: store.id,
      name,
      email,
      password: hashedPassword,
    })

    // await this.cacheProvider.invalidatePrefix('providers-list')

    return { store, employee }
  }
}

export default CreateStoreService

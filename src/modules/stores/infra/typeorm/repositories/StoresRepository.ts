import { getRepository, Repository } from 'typeorm'

import IStoresRepository from '@modules/stores/repositories/IStoresRepository'
import ICreateStoreDTO from '@modules/stores/dtos/ICreateStoreDTO'

import Store from '../entities/Store'

class StoresRepository implements IStoresRepository {
  private ormRepository: Repository<Store>

  constructor() {
    this.ormRepository = getRepository(Store)
  }

  public async findById(id: string): Promise<Store | undefined> {
    const store = await this.ormRepository.findOne(id)

    return store
  }

  public async findByEmail(email: string): Promise<Store | undefined> {
    const store = await this.ormRepository.findOne({
      where: { email },
    })

    return store
  }

  public async findAllStores(): Promise<Store[]> {
    const stores = await this.ormRepository.find()

    return stores
  }

  public async create(storeData: ICreateStoreDTO): Promise<Store> {
    const store = this.ormRepository.create(storeData)

    await this.ormRepository.save(store)

    return store
  }

  public async save(store: Store): Promise<Store> {
    return this.ormRepository.save(store)
  }
}

export default StoresRepository

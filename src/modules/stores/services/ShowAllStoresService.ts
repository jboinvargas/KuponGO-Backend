import { injectable, inject } from 'tsyringe'

// import AppError from '@shared/errors/AppError'
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import IStoresRepository from '../repositories/IStoresRepository'

import Store from '../infra/typeorm/entities/Store'

@injectable()
class ShowAllStoresService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Store[]> {
    const store = await this.storesRepository.findAllStores()
    // await this.cacheProvider.invalidatePrefix('providers-list')

    return store
  }
}

export default ShowAllStoresService

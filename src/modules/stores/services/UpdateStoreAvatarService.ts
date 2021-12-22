import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import IStoresRepository from '../repositories/IStoresRepository'

import Store from '../infra/typeorm/entities/Store'

interface IRequest {
  store_id: string
  avatarFilename: string
}

@injectable()
class UpdateStoreAvatarService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ store_id, avatarFilename }: IRequest): Promise<Store> {
    const store = await this.storesRepository.findById(store_id)

    if (!store) {
      throw new AppError('Only authenticated stores can change avatar.', 401)
    }

    if (store.avatar) {
      await this.storageProvider.deleteFile(store.avatar)
    }

    const filename = await this.storageProvider.saveFile(avatarFilename)

    store.avatar = filename

    await this.storesRepository.save(store)

    return store
  }
}

export default UpdateStoreAvatarService

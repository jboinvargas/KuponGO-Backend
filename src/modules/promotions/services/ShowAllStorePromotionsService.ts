import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IPromotionsRepository from '../repositories/IPromotionsRepository'

import Promotion from '../infra/typeorm/entities/Promotion'

interface IRequest {
  store_id: string
}

@injectable()
class ShowAllStorePromotionsService {
  constructor(
    @inject('PromotionsRepository')
    private promotionsRepository: IPromotionsRepository,
  ) {}

  public async execute({ store_id }: IRequest): Promise<Promotion[]> {
    const storePromotions = await this.promotionsRepository.findAllStorePromotions(
      store_id,
    )

    if (!storePromotions) {
      throw new AppError('Store promotions not found')
    }

    return storePromotions
  }
}

export default ShowAllStorePromotionsService

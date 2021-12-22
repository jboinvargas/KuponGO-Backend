import { getRepository, Repository } from 'typeorm'

import IPromotionsRepository from '@modules/promotions/repositories/IPromotionsRepository'
import ICreatePromotionDTO from '@modules/promotions/dtos/ICreatePromotionDTO'

import Promotion from '../entities/Promotion'

class PromotionsRepository implements IPromotionsRepository {
  private ormRepository: Repository<Promotion>

  constructor() {
    this.ormRepository = getRepository(Promotion)
  }

  public async findById(id: string): Promise<Promotion | undefined> {
    const promotion = await this.ormRepository.findOne(id)

    return promotion
  }

  public async findAllPromotions(): Promise<Promotion[]> {
    const promotions = await this.ormRepository.find()

    return promotions
  }

  public async findAllStorePromotions(store_id: string): Promise<Promotion[]> {
    const promotions = await this.ormRepository.find({ store_id })

    return promotions
  }

  public async create(userData: ICreatePromotionDTO): Promise<Promotion> {
    const promotion = this.ormRepository.create(userData)

    await this.ormRepository.save(promotion)

    return promotion
  }

  public async save(promotion: Promotion): Promise<Promotion> {
    return this.ormRepository.save(promotion)
  }
}

export default PromotionsRepository

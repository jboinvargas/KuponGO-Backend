import Promotion from '../infra/typeorm/entities/Promotion'
import ICreatePromotionDTO from '../dtos/ICreatePromotionDTO'

export default interface IPromotionsRepository {
  findAllPromotions(): Promise<Promotion[]>
  findAllStorePromotions(store_id: string): Promise<Promotion[]>
  findById(id: string): Promise<Promotion | undefined>
  create(data: ICreatePromotionDTO): Promise<Promotion>
  save(promotion: Promotion): Promise<Promotion>
}

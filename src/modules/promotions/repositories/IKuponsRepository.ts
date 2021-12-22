import Kupon from '../infra/typeorm/entities/Kupon'
import ICreateKuponDTO from '../dtos/ICreateKuponDTO'

export default interface IKuponsRepository {
  findAllKupons(): Promise<Kupon[]>
  findAllUserKupons(user_id: string): Promise<Kupon[]>
  findAllAvailableKupons(promotion_id: string): Promise<Kupon[]>
  findById(id: string): Promise<Kupon | undefined>
  create(data: ICreateKuponDTO): Promise<Kupon>
  save(kupon: Kupon): Promise<Kupon>
}

import Store from '../infra/typeorm/entities/Store'
import ICreateStoreDTO from '../dtos/ICreateStoreDTO'

export default interface IStoresRepository {
  findAllStores(): Promise<Store[]>
  findById(id: string): Promise<Store | undefined>
  create(data: ICreateStoreDTO): Promise<Store>
  save(store: Store): Promise<Store>
}

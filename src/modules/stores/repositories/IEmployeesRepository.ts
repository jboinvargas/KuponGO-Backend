import Employee from '../infra/typeorm/entities/Employee'
import ICreateEmployeeDTO from '../dtos/ICreateEmployeeDTO'

export default interface IEmployessRepository {
  findAllEmployees(): Promise<Employee[]>
  findById(id: string): Promise<Employee | undefined>
  findByEmail(email: string): Promise<Employee | undefined>
  create(data: ICreateEmployeeDTO): Promise<Employee>
  save(store: Employee): Promise<Employee>
}

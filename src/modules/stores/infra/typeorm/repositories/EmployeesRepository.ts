import { getRepository, Repository } from 'typeorm'

import IEmployeesRepository from '@modules/stores/repositories/IEmployeesRepository'
import ICreateEmployeeDTO from '@modules/stores/dtos/ICreateEmployeeDTO'

import Employee from '../entities/Employee'

class EmployeesRepository implements IEmployeesRepository {
  private ormRepository: Repository<Employee>

  constructor() {
    this.ormRepository = getRepository(Employee)
  }

  public async findById(id: string): Promise<Employee | undefined> {
    const employee = await this.ormRepository.findOne(id)

    return employee
  }

  public async findByEmail(email: string): Promise<Employee | undefined> {
    const employee = await this.ormRepository.findOne({
      where: { email },
    })

    return employee
  }

  public async findAllEmployees(): Promise<Employee[]> {
    const employees = await this.ormRepository.find()

    return employees
  }

  public async create(employeeData: ICreateEmployeeDTO): Promise<Employee> {
    const employee = this.ormRepository.create(employeeData)

    await this.ormRepository.save(employee)

    return employee
  }

  public async save(employee: Employee): Promise<Employee> {
    return this.ormRepository.save(employee)
  }
}

export default EmployeesRepository

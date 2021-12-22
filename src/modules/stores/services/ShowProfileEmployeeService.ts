import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IEmployeesRepository from '../repositories/IEmployeesRepository'

import Employee from '../infra/typeorm/entities/Employee'

interface IRequest {
  employee_id: string
}

@injectable()
class ShowProfileEmployeeService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
  ) {}

  public async execute({ employee_id }: IRequest): Promise<Employee> {
    const employee = await this.employeesRepository.findById(employee_id)

    if (!employee) {
      throw new AppError('Employee not found')
    }

    return employee
  }
}

export default ShowProfileEmployeeService

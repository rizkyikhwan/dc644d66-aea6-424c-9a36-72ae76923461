import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee, EmployeeDocument } from './employee.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/employee.dto';

@Injectable()
export class EmployeeService {
  constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) { }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec()
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const newEmployee = new this.employeeModel(createEmployeeDto)
    return newEmployee.save()
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const updatedEmployee = await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, {
      new: true
    }).exec()

    if (!updatedEmployee) {
      throw new NotFoundException(`Employee with ID ${id} not found`)
    }

    return updatedEmployee
  }

  async delete(id: string): Promise<Employee> {
    const deletedEmployee = await this.employeeModel.findByIdAndDelete(id).exec()

    if (!deletedEmployee) {
      throw new NotFoundException(`Employee with ID ${id} not found`)
    }

    return deletedEmployee
  }
}

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.schema';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/employee.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Get()
  @ApiOperation({ summary: "Get all employees" })
  @ApiResponse({ status: 200, description: "List of employees" })
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAll()
  }

  @Post()
  @ApiOperation({ summary: "Add new employee" })
  @ApiResponse({ status: 201, description: "Employee added" })
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeService.create(createEmployeeDto)
  }

  @Put(":id")
  @ApiOperation({ summary: "Edit employee" })
  @ApiResponse({ status: 200, description: "Employee edited" })
  async update(@Param("id") id: string, @Body() updateEmployee: UpdateEmployeeDto): Promise<Employee> {
    return this.employeeService.update(id, updateEmployee)
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete employee" })
  @ApiResponse({ status: 200, description: "Employee deleted" })
  async delete(@Param("id") id: string): Promise<Employee> {
    return this.employeeService.delete(id)
  }
}

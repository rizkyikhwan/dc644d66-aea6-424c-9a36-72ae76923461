import { ApiProperty } from "@nestjs/swagger"

export class CreateEmployeeDto {
  @ApiProperty({ description: "First Name of the employee" })
  firstName: string

  @ApiProperty({ description: "Last Name of the employee" })
  lastName: string

  @ApiProperty({ description: "Position of the employee" })
  position: string

  @ApiProperty({ description: "Phone number of the employee" })
  phone: string

  @ApiProperty({ description: "Email of the employee" })
  email: string
}

export class UpdateEmployeeDto {
  @ApiProperty({ description: "First Name of the employee" })
  firstName?: string

  @ApiProperty({ description: "Last Name of the employee" })
  lastName?: string

  @ApiProperty({ description: "Position of the employee" })
  position?: string

  @ApiProperty({ description: "Phone number of the employee" })
  phone?: string

  @ApiProperty({ description: "Email of the employee" })
  email?: string
}
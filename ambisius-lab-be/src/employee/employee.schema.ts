import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Employee {
  @Prop({ required: true })
  firstName: string

  @Prop({ required: true })
  lastName: string

  @Prop({ required: true })
  position: string

  @Prop({ required: true })
  phone: string

  @Prop({ required: true })
  email: string
}


export type EmployeeDocument = Employee & Document

export const EmployeeSchema = SchemaFactory.createForClass(Employee)

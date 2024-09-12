import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://dbuser:dbuser123@cluster0.cd55u.mongodb.net/"),
    EmployeeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

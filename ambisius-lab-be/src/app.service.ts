import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Ambisius-Lab BE with NestJs';
  }
}

import { Controller, Get, Inject } from '@nestjs/common';
import { SensorsService } from './sensors.service';

@Controller('sensors')
export class SensorsController {
  constructor(@Inject(SensorsService) private sensorsService: SensorsService) {}

  @Get('/import/')
  async import() {
    return await this.sensorsService.saveSensors();
  }
}

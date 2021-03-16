import { Controller, Get, Inject } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SensorsResp } from '../interfaces/sensors';

@Controller('sensors')
export class SensorsController {
  constructor(@Inject(SensorsService) private sensorsService: SensorsService) {}

  @Get('/import/')
  async import(): Promise<SensorsResp> {
    return await this.sensorsService.saveSensors();
  }
}

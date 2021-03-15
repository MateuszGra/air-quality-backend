import { Controller, Get, Inject } from '@nestjs/common';
import { StationsService } from './stations.service';
import { SensorsResp } from '../interfaces/stations';

@Controller('stations')
export class StationsController {
  constructor(
    @Inject(StationsService) private stationsService: StationsService,
  ) {}

  @Get('/import')
  async import(): Promise<SensorsResp> {
    return await this.stationsService.saveStations();
  }
}

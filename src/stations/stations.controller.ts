import { Controller, Get, Inject } from '@nestjs/common';
import { StationsService } from './stations.service';
import { SensorsResp } from '../interfaces/stations';

@Controller('stations')
export class StationsController {
  constructor(
    @Inject(StationsService) private stationsService: StationsService,
  ) {}
  @Get('/show-all')
  async showAll() {
    return await this.stationsService.showAll();
  }

  @Get('/import')
  async import(): Promise<SensorsResp> {
    return await this.stationsService.saveStations();
  }
}

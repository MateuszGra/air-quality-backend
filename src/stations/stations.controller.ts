import { Controller, Get, Inject } from '@nestjs/common';
import { StationsService } from './stations.service';
import { StationsResp } from '../interfaces/stations';

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
  async import(): Promise<StationsResp> {
    return await this.stationsService.saveStations();
  }
}

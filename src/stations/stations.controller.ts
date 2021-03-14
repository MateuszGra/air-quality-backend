import { Controller, Get, Inject } from '@nestjs/common';
import { StationsService } from './stations.service';

@Controller('stations')
export class StationsController {
  constructor(
    @Inject(StationsService) private stationsService: StationsService,
  ) {}

  @Get('/import')
  async import() {
    return await this.stationsService.importStations();
  }
}

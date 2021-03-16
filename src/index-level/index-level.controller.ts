import { Controller, Get, Inject } from '@nestjs/common';
import { IndexLevelService } from './index-level.service';
import { IndexLevelResp } from '../interfaces/index-level';

@Controller('index-level')
export class IndexLevelController {
  constructor(
    @Inject(IndexLevelService) private indexLevelService: IndexLevelService,
  ) {}

  @Get('/import')
  async import(): Promise<IndexLevelResp> {
    return await this.indexLevelService.saveIndexLevel();
  }
}

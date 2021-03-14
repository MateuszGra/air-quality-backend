import { Controller, Get, Inject } from '@nestjs/common';
import { IndexLevelService } from './index-level.service';

@Controller('index-level')
export class IndexLevelController {
  constructor(
    @Inject(IndexLevelService) private indexLevelService: IndexLevelService,
  ) {}

  @Get('/import/')
  async import() {
    return await this.indexLevelService.saveIndexLevel();
  }
}

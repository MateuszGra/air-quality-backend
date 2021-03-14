import { Module } from '@nestjs/common';
import { IndexLevelController } from './index-level.controller';
import { IndexLevelService } from './index-level.service';

@Module({
  controllers: [IndexLevelController],
  providers: [IndexLevelService],
})
export class IndexLevelModule {}

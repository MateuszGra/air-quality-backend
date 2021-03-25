import { Module } from '@nestjs/common';
import { IndexLevelController } from './index-level.controller';
import { IndexLevelService } from './index-level.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IndexLevel, IndexLevelSchema } from '../schemas/index-level.schema';
import { Stations, StationsSchema } from '../schemas/stations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Stations.name,
        schema: StationsSchema,
      },
      {
        name: IndexLevel.name,
        schema: IndexLevelSchema,
      },
    ]),
  ],
  controllers: [IndexLevelController],
  providers: [IndexLevelService],
})
export class IndexLevelModule {}

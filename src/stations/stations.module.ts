import { Module } from '@nestjs/common';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Stations, StationsSchema } from '../interfaces/stations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Stations.name,
        schema: StationsSchema,
      },
    ]),
  ],
  controllers: [StationsController],
  providers: [StationsService],
})
export class StationsModule {}

import { forwardRef, Module } from '@nestjs/common';
import { SensorsController } from './sensors.controller';
import { SensorsService } from './sensors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sensors, SensorsSchema } from '../schemas/sensors.schema';
import { StationsModule } from '../stations/stations.module';

@Module({
  imports: [
    forwardRef(() => StationsModule),
    MongooseModule.forFeature([
      {
        name: Sensors.name,
        schema: SensorsSchema,
      },
    ]),
  ],
  controllers: [SensorsController],
  providers: [SensorsService],
})
export class SensorsModule {}

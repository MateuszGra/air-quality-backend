import { Module } from '@nestjs/common';
import { ValuesController } from './values.controller';
import { ValuesService } from './values.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Values, ValuesSchema } from '../schemas/values.schema';
import { Sensors, SensorsSchema } from '../schemas/sensors.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Sensors.name,
        schema: SensorsSchema,
      },
      {
        name: Values.name,
        schema: ValuesSchema,
      },
    ]),
  ],
  controllers: [ValuesController],
  providers: [ValuesService],
})
export class ValuesModule {}

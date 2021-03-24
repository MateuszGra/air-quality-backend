import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SensorsData } from '../interfaces/sensors';

@Schema()
export class Sensors extends Document implements SensorsData {
  @Prop({ index: true })
  id: number;

  @Prop()
  idParam: number;

  @Prop()
  idStation: number;
}

export const SensorsSchema = SchemaFactory.createForClass(Sensors);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { SensorsData } from '../interfaces/sensors';
import { Stations } from './stations.schema';

@Schema()
export class Sensors extends Document implements SensorsData {
  @Prop({ index: true })
  id: number;

  @Prop()
  param: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: Stations.name })
  station: Types.ObjectId;
}

export const SensorsSchema = SchemaFactory.createForClass(Sensors);

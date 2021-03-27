import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { ValuesData } from '../interfaces/values';
import { Sensors } from './sensors.schema';

@Schema()
export class Values extends Document implements ValuesData {
  @Prop({ index: true })
  date: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: Sensors.name })
  sensor: Types.ObjectId;

  @Prop()
  value: number;
}

export const ValuesSchema = SchemaFactory.createForClass(Values);

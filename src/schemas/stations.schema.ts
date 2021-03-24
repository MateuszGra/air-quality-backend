import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { StationsData } from '../interfaces/stations';

@Schema()
export class Stations extends Document implements StationsData {
  @Prop({ index: true })
  id: number;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  @Prop()
  name: string;
}

export const StationsSchema = SchemaFactory.createForClass(Stations);

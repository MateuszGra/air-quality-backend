import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { StationsData } from './stations';

@Schema()
export class Stations extends Document implements StationsData {
  @Prop()
  id: number;

  @Prop()
  gegrLat: number;

  @Prop()
  gegrLon: number;

  @Prop()
  name: string;
}

export const StationsSchema = SchemaFactory.createForClass(Stations);

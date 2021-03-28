import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { IndexLevelData } from '../interfaces/index-level';
import { Stations } from './stations.schema';

@Schema()
export class IndexLevel extends Document implements IndexLevelData {
  @Prop({ index: true })
  date: Date;

  @Prop()
  index: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: Stations.name })
  station: Types.ObjectId;
}

export const IndexLevelSchema = SchemaFactory.createForClass(IndexLevel);

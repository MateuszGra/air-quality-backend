import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IndexLevelResp } from '../interfaces/index-level';
import { InjectModel } from '@nestjs/mongoose';
import { Stations } from '../schemas/stations.schema';
import { Model } from 'mongoose';
import { IndexLevel } from '../schemas/index-level.schema';

@Injectable()
export class IndexLevelService {
  constructor(
    @InjectModel(Stations.name)
    private StationModel: Model<Stations>,
    @InjectModel(IndexLevel.name)
    private IndexLevelModel: Model<IndexLevel>,
  ) {}

  async fetchIndexLevel(id) {
    try {
      const indexLevel = await axios
        .get(`http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/${id}`)
        .then(function (response) {
          return response;
        });
      return {
        success: true,
        items: indexLevel.data,
      };
    } catch (e) {
      return {
        success: false,
        errors: [e.message],
      };
    }
  }

  async saveIndexLevel(): Promise<IndexLevelResp> {
    try {
      const stations = await this.StationModel.find();
      for (const station of stations) {
        const indexLevelResp = await this.fetchIndexLevel(station.id);
        if (indexLevelResp.success === true) {
          const indexExist = await this.IndexLevelModel.findOne({
            station: station._id,
            date: indexLevelResp.items.stCalcDate,
          }).exec();

          if (!indexExist && indexLevelResp.items.stIndexLevel != null) {
            const newSensor = await this.IndexLevelModel.create({
              date: indexLevelResp.items.stCalcDate,
              station: station,
              index: indexLevelResp.items.stIndexLevel.id,
            });
            await newSensor.save();
            console.log(`\x1b[32m`, `CREATE index id: ${newSensor.id}`);
          }
        }
      }
      return { success: true };
    } catch (e) {
      return {
        success: false,
        errors: [e.message],
      };
    }
  }
}

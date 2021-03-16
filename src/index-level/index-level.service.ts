import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { StationsEntity } from '../stations/stations.entity';
import { IndexLevelEntity } from './index-level.entity';
import { IndexLevelResp } from '../interfaces/index-level';

@Injectable()
export class IndexLevelService {
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
      const stations: StationsEntity[] = await StationsEntity.find();

      for (const station of stations) {
        const indexLevelResp = await this.fetchIndexLevel(station.id);
        if (indexLevelResp.success === true) {
          const indexExist = await IndexLevelEntity.findOne({
            where: {
              station: indexLevelResp.items.id,
              date: indexLevelResp.items.stCalcDate,
            },
          });

          if (!indexExist && indexLevelResp.items.stIndexLevel != null) {
            const newSensor = IndexLevelEntity.create({
              date: indexLevelResp.items.stCalcDate,
              station: station,
              indexId: indexLevelResp.items.stIndexLevel.id,
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

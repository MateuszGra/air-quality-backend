import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { StationsEntity } from '../stations/stations.entity';
import { IndexLevelEntity } from './index-level.entity';

@Injectable()
export class IndexLevelService {
  async fetchIndexLevel(id) {
    const indexLevel = await axios
      .get(`http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/${id}`)
      .then(function (response) {
        return response;
      });
    return indexLevel.data;
  }

  async saveIndexLevel() {
    const stations: StationsEntity[] = await StationsEntity.find();

    for (const station of stations) {
      const indexLevel = await this.fetchIndexLevel(station.id);

      const indexExist: IndexLevelEntity = await IndexLevelEntity.findOne({
        where: {
          station: indexLevel.id,
          date: indexLevel.stCalcDate,
        },
      });

      if (!indexExist && indexLevel.stIndexLevel != null) {
        const newSensor = IndexLevelEntity.create({
          date: indexLevel.stCalcDate,
          station: station,
          indexId: indexLevel.stIndexLevel.id,
        });
        await newSensor.save();
        console.log(`\x1b[32m`, `CREATE sensor id: ${indexLevel.id}`);
      }
    }
  }
}

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { StationsEntity } from './stations.entity';

@Injectable()
export class StationsService {
  async fetchStations() {
    const stations = await axios
      .get('https://api.gios.gov.pl/pjp-api/rest/station/findAll')
      .then(function (response) {
        return response;
      });
    return stations.data;
  }

  async saveStations() {
    const stations = await this.fetchStations();

    for (const station of stations) {
      const stationExist = await StationsEntity.findOne(station.id);

      if (station.city && station.addressStreet != null) {
        station.city.name += ` ${station.addressStreet}`;
      } else {
        if (station.addressStreet) {
          station.city = { name: station.addressStreet };
        }
        if (station.stationName) {
          station.city = { name: station.stationName };
        } else {
          station.city = { name: `Brak adresu, id ${station.id}` };
        }
      }

      if (!stationExist) {
        const newStation = StationsEntity.create({
          id: station.id,
          name: station.city.name,
        });
        await newStation.save();
        console.log(`\x1b[32m`, `CREATE station id: ${station.id}`);
      } else if (stationExist && stationExist.name !== station.city.name) {
        await StationsEntity.update(station.id, {
          name: station.city.name,
        });
        console.log(`\x1b[32m`, `UPDATE station id: ${station.id}`);
      }
    }
    return stations;
  }
}

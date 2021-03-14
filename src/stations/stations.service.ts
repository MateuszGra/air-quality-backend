import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class StationsService {
  async importStations() {
    const stations = await axios
      .get('https://api.gios.gov.pl/pjp-api/rest/station/findAll')
      .then(function (response) {
        return response;
      });
    console.log(stations);
    return stations.data;
  }
}

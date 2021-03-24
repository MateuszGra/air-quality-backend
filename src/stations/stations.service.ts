import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { StationsResp } from '../interfaces/stations';
import { InjectModel } from '@nestjs/mongoose';
import { Stations } from '../interfaces/stations.schema';
import { Model } from 'mongoose';

@Injectable()
export class StationsService {
  constructor(
    @InjectModel(Stations.name)
    private StationModel: Model<Stations>,
  ) {}

  async fetchStations() {
    try {
      const stations = await axios
        .get('https://api.gios.gov.pl/pjp-api/rest/station/findAll')
        .then(function (response) {
          return response;
        });
      return {
        success: true,
        items: stations.data,
      };
    } catch (e) {
      return {
        success: false,
        errors: [e.message],
      };
    }
  }

  async saveStations(): Promise<StationsResp> {
    try {
      const stationsResp = await this.fetchStations();
      if (stationsResp.success === true) {
        for (const station of stationsResp.items) {
          const stationExist = await this.StationModel.findOne({
            id: station.id,
          });

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
            const newStation = await this.StationModel.create({
              id: station.id,
              name: station.city.name,
              gegrLat: station.gegrLat,
              gegrLon: station.gegrLon,
            });

            await newStation.save();
            console.log(`\x1b[32m`, `CREATE station id: ${station.id}`);
          } else if (
            stationExist.name !== station.city.name ||
            stationExist.gegrLat !== Number(station.gegrLat) ||
            stationExist.gegrLon !== Number(station.gegrLon)
          ) {
            await this.StationModel.updateOne(
              { id: station.id },
              {
                name: station.city.name,
                gegrLat: station.gegrLat,
                gegrLon: station.gegrLon,
              },
            );

            console.log(`\x1b[32m`, `UPDATE station id: ${station.id}`);
          }
        }

        return { success: true };
      } else {
        throw new Error(stationsResp.errors[0]);
      }
    } catch (e) {
      return {
        success: false,
        errors: [e.message],
      };
    }
  }

  async showAll() {
    try {
      const items = await this.StationModel.find()
        .select(['-__v', '-_id'])
        .exec();

      if (items.length === 0) {
        throw new Error('Not found');
      }

      return {
        success: true,
        count: items.length,
        items,
      };
    } catch (e) {
      return {
        success: false,
        errors: [e.message],
      };
    }
  }
}

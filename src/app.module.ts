import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StationsModule } from './stations/stations.module';
import { SensorsModule } from './sensors/sensors.module';
import { IndexLevelModule } from './index-level/index-level.module';
import { ValuesModule } from './values/values.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/air-quality'),
    StationsModule,
    SensorsModule,
    IndexLevelModule,
    ValuesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

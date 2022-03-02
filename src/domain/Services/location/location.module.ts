import { LocationService } from './location.service';
import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}

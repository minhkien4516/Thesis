import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { InjectRedis, Redis } from '@svtslv/nestjs-ioredis';
import { GET_LOCATION } from '../../../constants/cacheKey.constant';
import { AddNewLocationDto } from './dtos/addNewLocation.dto';
import { UpdateLocationDto } from './dtos/updateLocation.dto';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  private readonly logger = new Logger('LocationController');

  constructor(
    private locationService: LocationService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Post()
  async addNewLocation(
    @Query('jobId') jobId: string,
    @Body() addNewLocationDto: AddNewLocationDto,
  ) {
    try {
      const location = await this.locationService.addNewLocation({
        ...addNewLocationDto,
      });
      await this.locationService.addJobLocation({
        jobId,
        locationId: location.id,
      });
      await this.redis.del(
        GET_LOCATION +
          `{${
            addNewLocationDto.details +
            addNewLocationDto.street +
            addNewLocationDto.ward +
            addNewLocationDto.district +
            addNewLocationDto.city +
            addNewLocationDto.country
          }}`,
      );

      return location;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Patch()
  public async updateLocation(
    @Query('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    try {
      const result = await this.locationService.UpdateLocation(
        id,
        updateLocationDto,
      );
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}

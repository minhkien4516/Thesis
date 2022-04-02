import { AddNewLocationDto } from './dtos/addNewLocation.dto';
import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Location } from '../../Models/location.model';
import { DatabaseError, QueryTypes } from 'sequelize';
import slugify from 'slugify';
import { AddJobLocationDto } from './dtos/addJobLocation.dto';
import { UpdateLocationDto } from './dtos/updateLocation.dto';

@Injectable()
export class LocationService {
  private readonly logger = new Logger('LocationService');

  constructor(private readonly sequelize: Sequelize) {}

  public async addNewLocation(
    addNewLocationDto: AddNewLocationDto,
  ): Promise<Location> {
    try {
      if (!addNewLocationDto.city) return null;
      const slug = slugify(addNewLocationDto.city, {
        lower: true,
        trim: true,
        replacement: '-',
      });
      const inserted = await this.sequelize.query(
        'SP_AddNewLocation @country=:country, @city=:city,@district=:district,' +
          '@ward=:ward,@street=:street,@details=:details,@slug=:slug',
        {
          type: QueryTypes.SELECT,
          replacements: {
            country: addNewLocationDto.country,
            city: addNewLocationDto.city,
            district: addNewLocationDto.district,
            ward: addNewLocationDto.ward,
            street: addNewLocationDto.street,
            details: addNewLocationDto.details,
            slug,
          },
          raw: true,
          mapToModel: true,
          model: Location,
        },
      );
      console.log(inserted);
      return inserted[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  public async addJobLocation(
    addJobLocationDto: AddJobLocationDto,
  ): Promise<any> {
    try {
      const inserted = await this.sequelize.query(
        'SP_AddJobLocation @jobId=:jobId, @locationId=:locationId',
        {
          type: QueryTypes.SELECT,
          replacements: {
            ...addJobLocationDto,
          },
          raw: true,
        },
      );
      console.log(inserted);
      return inserted[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async UpdateLocation(id: string, updateLocationDto: UpdateLocationDto) {
    try {
      if (!updateLocationDto.city) return null;
      const slug = slugify(updateLocationDto.city, {
        lower: true,
        trim: true,
        replacement: '-',
      });
      const updated = await this.sequelize.query(
        'SP_UpdateLocation @id=:id,@country=:country, @city=:city,' +
          '@district=:district, @ward=:ward, @street=:street, @details=:details,@slug=:slug',
        {
          type: QueryTypes.UPDATE,
          replacements: {
            id,
            country: updateLocationDto.country,
            city: updateLocationDto.city,
            district: updateLocationDto.district,
            ward: updateLocationDto.ward,
            street: updateLocationDto.street,
            details: updateLocationDto.details,
            slug,
          },
          raw: true,
          mapToModel: true,
          model: Location,
        },
      );
      return updated[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}

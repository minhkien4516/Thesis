import { AddNewLocationDto } from './dtos/addNewLocation.dto';
import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Location } from '../../Models/location.model';
import { DatabaseError, QueryTypes } from 'sequelize';
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
      const inserted = await this.sequelize.query(
        'SP_AddNewLocation @country=:country, @city=:city,@district=:district,@ward=:ward,@street=:street,@details=:details',
        {
          type: QueryTypes.SELECT,
          replacements: { ...addNewLocationDto },
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
      const updated = await this.sequelize.query(
        'SP_UpdateLocation @id=:id,@country=:country, @city=:city,' +
          '@district=:district, @ward=:ward, @street=:street, @details=:details',
        {
          type: QueryTypes.UPDATE,
          replacements: {
            id,
            ...updateLocationDto,
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

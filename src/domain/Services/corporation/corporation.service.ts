import { Corporation } from './../../Models/corporation.model';
import { AddNewCorporationDto } from './dtos/addNewCorporation.dto';
import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes, DatabaseError } from 'sequelize';
import slugify from 'vietnamese-slug';
import { CorporationFilter } from '../../interfaces/getCorporationForClients.interface';
import { UpdateCorporationDto } from './dtos/updateCorporation.dto';

@Injectable()
export class CorporationService {
  private readonly logger = new Logger('CorporationService');

  constructor(private readonly sequelize: Sequelize) {}

  public async addNewCorporation(
    addNewCorporationDto: AddNewCorporationDto,
  ): Promise<CorporationFilter[]> {
    try {
      if (!addNewCorporationDto.name) return [];
      const slug = slugify(addNewCorporationDto.name);
      const inserted: CorporationFilter[] = await this.sequelize.query(
        'SP_AddNewCorporation @name=:name, @hotline=:hotline, @email=:email, @presenterId=:presenterId, @overtimeRequire=:overtimeRequire,' +
          ' @special=:special, @startWorkTime=:startWorkTime, @endWorkTime=:endWorkTime, @origin=:origin, @numberEmployees=:numberEmployees, @slug=:slug',
        {
          type: QueryTypes.SELECT,
          replacements: {
            name: addNewCorporationDto.name.trim(),
            hotline: addNewCorporationDto.hotline,
            email: addNewCorporationDto.email,
            presenterId: addNewCorporationDto.presenterId,
            overtimeRequire: addNewCorporationDto.overtimeRequire,
            special: addNewCorporationDto.special,
            startWorkTime: addNewCorporationDto.startWorkTime,
            endWorkTime: addNewCorporationDto.endWorkTime,
            origin: addNewCorporationDto.origin,
            numberEmployees: addNewCorporationDto.numberEmployees,
            slug,
          },
          raw: true,
        },
      );
      return inserted;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  public async getCorporationByPresenterId(
    id: string,
  ): Promise<CorporationFilter> {
    try {
      const corporation = await this.sequelize.query(
        'SP_GetCorporationByPresenterId @presenterId=:id',
        {
          type: QueryTypes.RAW,
          replacements: {
            id,
          },
          raw: true,
        },
      );

      if (
        typeof Object.keys(corporation) == null ||
        typeof Object.keys(corporation) == 'undefined' ||
        !corporation[0].length
      )
        return corporation[0][0];
      {
        const info: string = corporation[0]
          .map((each: string) => {
            return Object.values(each)[0];
          })
          .reduce((acc: string, curr: string) => acc + curr, '');
        return JSON.parse(info);
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
  public async getLocationForCorporation(id: string) {
    try {
      const location = await this.sequelize.query(
        'SP_GetLocationForCorporationByCorporationId @id=:id',
        {
          type: QueryTypes.RAW,
          replacements: {
            id,
          },
          raw: true,
        },
      );

      if (
        typeof Object.keys(location) == null ||
        typeof Object.keys(location) == 'undefined' ||
        !location[0].length
      )
        return location[0][0];
      {
        const info: string = location[0]
          .map((each: string) => {
            return Object.values(each)[0];
          })
          .reduce((acc: string, curr: string) => acc + curr, '');
        return JSON.parse(info);
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  public async getCorporationById(id: string): Promise<CorporationFilter> {
    try {
      const corporation = await this.sequelize.query(
        'SP_GetCorporationById @id=:id',
        {
          type: QueryTypes.RAW,
          replacements: {
            id,
          },
          raw: true,
        },
      );

      if (
        typeof Object.keys(corporation) == null ||
        typeof Object.keys(corporation) == 'undefined' ||
        !corporation[0].length
      )
        return corporation[0][0];
      {
        const info: string = corporation[0]
          .map((each: string) => {
            return Object.values(each)[0];
          })
          .reduce((acc: string, curr: string) => acc + curr, '');
        return JSON.parse(info);
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  public async getCorporationByName(name: string): Promise<CorporationFilter> {
    try {
      const corporation = await this.sequelize.query(
        'SP_GetCorporationByName @name=:name',
        {
          type: QueryTypes.RAW,
          replacements: {
            name,
          },
          raw: true,
        },
      );

      if (
        typeof Object.keys(corporation) == null ||
        typeof Object.keys(corporation) == 'undefined' ||
        !corporation[0].length
      )
        return corporation[0][0];
      {
        const info: string = corporation[0]
          .map((each: string) => {
            return Object.values(each)[0];
          })
          .reduce((acc: string, curr: string) => acc + curr, '');
        return JSON.parse(info);
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  public async getAllCorporation(
    limit?: number,
    offset?: number,
  ): Promise<CorporationFilter[]> {
    try {
      if (limit < 1 || offset < 0) return [];
      const totalCorporation: CorporationFilter[] = await this.sequelize.query(
        'SP_GetAllCorporation @limit=:limit,@offset=:offset',
        {
          type: QueryTypes.SELECT,
          replacements: {
            limit,
            offset,
          },
          raw: true,
        },
      );
      return totalCorporation;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getTotalCorporationsForClient() {
    try {
      const total = await this.sequelize.query(
        'SP_GetTotalCorporationForClient',
        {
          type: QueryTypes.SELECT,
          raw: true,
          mapToModel: true,
          model: Corporation,
        },
      );
      return total[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async UpdateCorporation(
    id: string,
    updateCorporationDto?: UpdateCorporationDto,
  ) {
    try {
      const updated = await this.sequelize.query(
        'SP_UpdateCorporation @id=:id,@name=:name,@hotline=:hotline,@email=:email,@overtimeRequire=:overtimeRequire,' +
          '@special=:special,@startWorkTime=:startWorkTime,@endWorkTime=:endWorkTime,@origin=:origin,' +
          '@numberEmployees=:numberEmployees,@slug=:slug',
        {
          type: QueryTypes.SELECT,
          replacements: {
            id,
            name: updateCorporationDto?.name?.trim() ?? null,
            hotline: updateCorporationDto?.hotline ?? null,
            email: updateCorporationDto?.email ?? null,
            overtimeRequire: updateCorporationDto?.overtimeRequire ?? null,
            special: updateCorporationDto?.special ?? null,
            startWorkTime: updateCorporationDto?.startWorkTime ?? null,
            endWorkTime: updateCorporationDto?.endWorkTime ?? null,
            origin: updateCorporationDto?.origin ?? null,
            numberEmployees: updateCorporationDto?.numberEmployees ?? null,
            slug: updateCorporationDto?.slug ?? null,
          },
          raw: true,
          mapToModel: true,
          model: Corporation,
        },
      );
      updated[0].slug = slugify(updated[0].name);
      return updated[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}

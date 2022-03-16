import { Corporation } from './../../Models/corporation.model';
import { AddNewCorporationDto } from './dtos/addNewCorporation.dto';
import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes, DatabaseError } from 'sequelize';
import slugify from 'slugify';
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
      const slug = slugify(addNewCorporationDto.name, {
        lower: true,
        trim: true,
        replacement: '-',
      });
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
    presenterId: string,
  ): Promise<CorporationFilter[]> {
    try {
      const corporation: CorporationFilter[] = await this.sequelize.query(
        'SP_GetCorporationByPresenterId @presenterId=:presenterId',
        {
          type: QueryTypes.SELECT,
          replacements: {
            presenterId,
          },
          raw: true,
        },
      );
      return corporation;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  public async getCorporationById(id: string): Promise<CorporationFilter[]> {
    try {
      const corporation: CorporationFilter[] = await this.sequelize.query(
        'SP_GetCorporationById @id=:id',
        {
          type: QueryTypes.SELECT,
          replacements: {
            id,
          },
          raw: true,
        },
      );
      return corporation;
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
    updateCorporationDto: UpdateCorporationDto,
  ) {
    try {
      if (!updateCorporationDto.name) return [];
      const slug = slugify(updateCorporationDto.name, {
        lower: true,
        trim: true,
        replacement: '-',
      });
      const updated = await this.sequelize.query(
        'SP_UpdateCorporation @id=:id,@name=:name,@hotline=:hotline,@email=:email,@overtimeRequire=:overtimeRequire,' +
          '@special=:special,@startWorkTme=:startWorkTme,@endWorkTime=:endWorkTime,@origin=:origin,' +
          '@numberEmployees=:numberEmployees,@slug=:slug',
        {
          type: QueryTypes.UPDATE,
          replacements: {
            id,
            name: updateCorporationDto?.name?.trim(),
            hotline: updateCorporationDto?.hotline,
            email: updateCorporationDto?.email,
            overtimeRequire: updateCorporationDto?.overtimeRequire,
            special: updateCorporationDto?.special,
            startWorkTime: updateCorporationDto?.startWorkTime,
            endWorkTime: updateCorporationDto?.endWorkTime,
            origin: updateCorporationDto?.origin,
            numberEmployees: updateCorporationDto?.numberEmployees,
            slug,
          },
          raw: true,
          mapToModel: true,
          model: Corporation,
        },
      );
      return updated[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}

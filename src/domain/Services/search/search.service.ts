import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes, DatabaseError } from 'sequelize';

@Injectable()
export class SearchService {
  private readonly logger = new Logger('SearchService');

  constructor(private readonly sequelize: Sequelize) {}

  public async getJobBySkill(
    name: string,
    limit: number,
    offset: number,
  ): Promise<any> {
    try {
      const job: any = await this.sequelize.query(
        'SP_GetJobBySkill @name=:name, @limit=:limit, @offset=:offset',
        {
          type: QueryTypes.SELECT,
          replacements: {
            name,
            limit,
            offset,
          },
          raw: true,
        },
      );
      return job;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  public async getJobByLevel(
    level: string,
    limit: number,
    offset: number,
  ): Promise<any> {
    try {
      const job: any = await this.sequelize.query(
        'SP_GetJobByLevel @level=:level, @limit=:limit, @offset=:offset',
        {
          type: QueryTypes.SELECT,
          replacements: {
            level,
            limit,
            offset,
          },
          raw: true,
        },
      );
      return job;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}

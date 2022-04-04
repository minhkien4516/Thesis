import { map } from 'rxjs';
import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes, DatabaseError } from 'sequelize';

@Injectable()
export class SearchService {
  private readonly logger = new Logger('SearchService');

  constructor(private readonly sequelize: Sequelize) {}

  public async getJobByCorporation(
    name: string,
    limit: number,
    offset: number,
  ) {
    try {
      const job: any = await this.sequelize.query(
        'SP_GetJobByCorporation @name=:name, @limit=:limit, @offset=:offset',
        {
          type: QueryTypes.RAW,
          replacements: {
            name,
            limit,
            offset,
          },
          raw: true,
        },
      );
      if (
        typeof Object.keys(job) == null ||
        typeof Object.keys(job) == 'undefined' ||
        !job[0].length
      )
        return job[0];

      {
        const info: string = job[0]
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

  public async getJobByCity(name: string, limit: number, offset: number) {
    try {
      const job: any = await this.sequelize.query(
        'SP_GetJobByCity @city=:name, @limit=:limit, @offset=:offset',
        {
          type: QueryTypes.RAW,
          replacements: {
            name,
            limit,
            offset,
          },
          raw: true,
        },
      );
      if (
        typeof Object.keys(job) == null ||
        typeof Object.keys(job) == 'undefined' ||
        !job[0].length
      )
        return job[0];

      {
        const info: string = job[0]
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

  public async getJobByTitle(name: string, limit: number, offset: number) {
    try {
      const job: any = await this.sequelize.query(
        'SP_GetJobByTitle @title=:name, @limit=:limit, @offset=:offset',
        {
          type: QueryTypes.RAW,
          replacements: {
            name,
            limit,
            offset,
          },
          raw: true,
        },
      );
      if (
        typeof Object.keys(job) == null ||
        typeof Object.keys(job) == 'undefined' ||
        !job[0].length
      )
        return job[0];

      {
        const info: string = job[0]
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

  public async getJobBySkill(name: string, limit: number, offset: number) {
    try {
      const job: any = await this.sequelize.query(
        'SP_GetJobBySkill @name=:name, @limit=:limit, @offset=:offset',
        {
          type: QueryTypes.RAW,
          replacements: {
            name,
            limit,
            offset,
          },
          raw: true,
        },
      );
      if (
        typeof Object.keys(job) == null ||
        typeof Object.keys(job) == 'undefined' ||
        !job[0].length
      )
        return job[0];

      {
        const info: string = job[0]
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

  public async getJobByLevel(name: string, limit: number, offset: number) {
    try {
      const job: any = await this.sequelize.query(
        'SP_GetJobByLevel @level=:name, @limit=:limit, @offset=:offset',
        {
          type: QueryTypes.RAW,
          replacements: {
            name,
            limit,
            offset,
          },
          raw: true,
        },
      );
      if (
        typeof Object.keys(job) == null ||
        typeof Object.keys(job) == 'undefined' ||
        !job[0].length
      )
        return job[0];

      {
        const info: string = job[0]
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
}

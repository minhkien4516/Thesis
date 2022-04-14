import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes, DatabaseError } from 'sequelize';
import { JobFilter } from '../../interfaces/getJobForClients.interface';
import { Job } from '../../Models/job.model';

@Injectable()
export class SearchService {
  private readonly logger = new Logger('SearchService');

  constructor(private readonly sequelize: Sequelize) {}

  public async getJobByCorporation(
    name: string,
    limit: number,
    offset: number,
  ): Promise<JobFilter[]> {
    try {
      if (limit < 1 || offset < 0) return [];
      const job: JobFilter[] = await this.sequelize.query(
        'SP_GetJobByCorporation @name=:name, @limit=:limit, @offset=:offset',
        {
          type: QueryTypes.SELECT,
          replacements: {
            name,
            limit,
            offset,
          },
        },
      );
      return job;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
  async getTotalJobsByCorporation(name: string) {
    try {
      const total = await this.sequelize.query(
        'SP_GetTotalJobByCorporation @name=:name ',
        {
          type: QueryTypes.SELECT,
          replacements: {
            name,
          },
          raw: true,
          mapToModel: true,
          model: Job,
        },
      );
      return total[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getAllDataForCorporationByJobId(id: string, name: string) {
    try {
      const total = await this.sequelize.query(
        'SP_GetAllDataForCorporationByJobId @jobId=:id,@name=:name',
        {
          type: QueryTypes.RAW,
          replacements: {
            id,
            name,
          },
          raw: true,
        },
      );
      if (
        typeof Object.keys(total) == null ||
        typeof Object.keys(total) == 'undefined' ||
        !total[0].length
      )
        return total[0];
      {
        const info: string = total[0]
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

  public async getJobByCity(
    name: string,
    limit: number,
    offset: number,
  ): Promise<JobFilter[]> {
    try {
      if (limit < 1 || offset < 0) return [];
      const job: JobFilter[] = await this.sequelize.query(
        'SP_GetJobByCity @city=:name, @limit=:limit, @offset=:offset',
        {
          type: QueryTypes.SELECT,
          replacements: {
            name,
            limit,
            offset,
          },
        },
      );
      return job;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getTotalJobsByCity(name: string) {
    try {
      const total = await this.sequelize.query(
        'SP_GetTotalJobByCity @city=:name ',
        {
          type: QueryTypes.SELECT,
          replacements: {
            name,
          },
          raw: true,
          mapToModel: true,
          model: Job,
        },
      );
      return total[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getAllDataForCityByJobId(id: string, name: string) {
    try {
      const total = await this.sequelize.query(
        'SP_GetAllDataForCityByJobId @jobId=:id,@city=:name',
        {
          type: QueryTypes.RAW,
          replacements: {
            id,
            name,
          },
          raw: true,
        },
      );
      if (
        typeof Object.keys(total) == null ||
        typeof Object.keys(total) == 'undefined' ||
        !total[0].length
      )
        return total[0];
      {
        const info: string = total[0]
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

  public async getJobByTitle(
    name: string,
    limit: number,
    offset: number,
  ): Promise<JobFilter[]> {
    try {
      if (limit < 1 || offset < 0) return [];
      const job: JobFilter[] = await this.sequelize.query(
        'SP_GetJobByTitle @title=:name, @limit=:limit, @offset=:offset',
        {
          type: QueryTypes.SELECT,
          replacements: {
            name,
            limit,
            offset,
          },
        },
      );
      return job;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getTotalJobsByTitle(name: string) {
    try {
      const total = await this.sequelize.query(
        'SP_GetTotalJobByTitle @title=:name ',
        {
          type: QueryTypes.SELECT,
          replacements: {
            name,
          },
          raw: true,
          mapToModel: true,
          model: Job,
        },
      );
      return total[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getAllDataForTitleByJobId(id: string, name: string) {
    try {
      const total = await this.sequelize.query(
        'SP_GetAllDataForTitleByJobId @jobId=:id,@title=:name',
        {
          type: QueryTypes.RAW,
          replacements: {
            id,
            name,
          },
          raw: true,
        },
      );
      if (
        typeof Object.keys(total) == null ||
        typeof Object.keys(total) == 'undefined' ||
        !total[0].length
      )
        return total[0];
      {
        const info: string = total[0]
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

  public async getJobBySkill(
    name: string,
    limit: number,
    offset: number,
  ): Promise<JobFilter[]> {
    try {
      if (limit < 1 || offset < 0) return [];
      const job: JobFilter[] = await this.sequelize.query(
        'SP_GetJobBySkill @name=:name, @limit=:limit, @offset=:offset',
        {
          type: QueryTypes.SELECT,
          replacements: {
            name,
            limit,
            offset,
          },
        },
      );
      return job;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getTotalJobsBySkill(name: string) {
    try {
      const total = await this.sequelize.query(
        'SP_GetTotalJobBySkill @name=:name ',
        {
          type: QueryTypes.SELECT,
          replacements: {
            name,
          },
          raw: true,
          mapToModel: true,
          model: Job,
        },
      );
      return total[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getAllDataForSkillByJobId(id: string, name: string) {
    try {
      const total = await this.sequelize.query(
        'SP_GetAllDataForSkillByJobId @jobId=:id,@name=:name',
        {
          type: QueryTypes.RAW,
          replacements: {
            id,
            name,
          },
          raw: true,
        },
      );
      if (
        typeof Object.keys(total) == null ||
        typeof Object.keys(total) == 'undefined' ||
        !total[0].length
      )
        return total[0];
      {
        const info: string = total[0]
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

  public async getJobByLevel(
    name: string,
    limit: number,
    offset: number,
  ): Promise<JobFilter[]> {
    try {
      if (limit < 1 || offset < 0) return [];
      const job: JobFilter[] = await this.sequelize.query(
        'SP_GetJobByLevel @level=:name, @limit=:limit, @offset=:offset',
        {
          type: QueryTypes.SELECT,
          replacements: {
            name,
            limit,
            offset,
          },
        },
      );
      return job;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getTotalJobsByLevel(name: string) {
    try {
      const total = await this.sequelize.query(
        'SP_GetTotalJobByLevel @level=:name ',
        {
          type: QueryTypes.SELECT,
          replacements: {
            name,
          },
          raw: true,
          mapToModel: true,
          model: Job,
        },
      );
      return total[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getAllDataForLevelByJobId(id: string, name: string) {
    try {
      const total = await this.sequelize.query(
        'SP_GetAllDataForLevelByJobId @jobId=:id,@level=:name',
        {
          type: QueryTypes.RAW,
          replacements: {
            id,
            name,
          },
          raw: true,
        },
      );
      if (
        typeof Object.keys(total) == null ||
        typeof Object.keys(total) == 'undefined' ||
        !total[0].length
      )
        return total[0];
      {
        const info: string = total[0]
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

import { AddNewJobDto } from './dtos/addNewJob.dto';
import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Job } from '../../Models/job.model';
import { DatabaseError, QueryTypes } from 'sequelize';
import { UpdateJobDto } from './dtos/updateJob.dto';

@Injectable()
export class JobService {
  private readonly logger = new Logger('JobService');

  constructor(private readonly sequelize: Sequelize) {}

  public async addNewJob(addNewJobDto: AddNewJobDto): Promise<Job> {
    try {
      const inserted = await this.sequelize.query(
        'SP_AddNewJob @title=:title, @description=:description,' +
          '@dateReleased=:dateReleased, @numberCandidate=:numberCandidate',
        {
          type: QueryTypes.SELECT,
          replacements: {
            ...addNewJobDto,
          },
          raw: true,
          mapToModel: true,
          model: Job,
        },
      );
      return inserted[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  public async getJobById(id: string) {
    try {
      const job = await this.sequelize.query('SP_GetJobById @id=:id', {
        type: QueryTypes.SELECT,
        replacements: {
          id,
        },
        raw: true,
        mapToModel: true,
        model: Job,
      });
      return job;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  public async getAllJob(limit?: number, offset?: number) {
    try {
      if (limit < 1 || offset < 0) return [];
      const totalJob = await this.sequelize.query(
        'SP_GetAllJob @limit=:limit,@offset=:offset',
        {
          type: QueryTypes.SELECT,
          replacements: {
            limit,
            offset,
          },
          raw: true,
        },
      );
      return totalJob;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getTotalJobsForClient() {
    try {
      const total = await this.sequelize.query('SP_GetTotalJobForClient', {
        type: QueryTypes.SELECT,
        raw: true,
        mapToModel: true,
        model: Job,
      });
      return total[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
  async UpdateJob(id: string, updateJobDto: UpdateJobDto) {
    try {
      const updated = await this.sequelize.query(
        'SP_UpdateJob @id=:id,@title=:title, @description=:description,' +
          '@dateReleased=:dateReleased, @numberCandidate=:numberCandidate',
        {
          type: QueryTypes.UPDATE,
          replacements: {
            id,
            ...updateJobDto,
          },
          raw: true,
          mapToModel: true,
          model: Job,
        },
      );
      return updated[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}

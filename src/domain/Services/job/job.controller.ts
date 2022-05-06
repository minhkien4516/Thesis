import { firstValueFrom, map, timeout } from 'rxjs';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GET_JOB } from '../../../constants/cacheKey.constant';
import { AddNewJobsDto } from './dtos/addNewJob.dto';
import { UpdateJobDto } from './dtos/updateJob.dto';
import { JobService } from './job.service';
import {
  JobDetail,
  JobFilterResponse,
} from '../../interfaces/getJobForClients.interface';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { CorporationService } from '../corporation/corporation.service';
import { FilesService } from '../files/files.service';
import { GetAllForOwnerResponse } from '../../interfaces';
import { defaultTimeout } from '../../../constants/timeout.constant';

@Controller('job')
export class JobController {
  private readonly logger = new Logger('JobController');

  constructor(
    private jobService: JobService,
    @InjectRedis() private readonly redis: Redis,
    private corporationService: CorporationService,
    private readonly fileService: FilesService,
  ) {}

  @Post()
  async addNewJob(
    @Query('corporationId') corporationId: string,
    @Body() addNewJobsDto: AddNewJobsDto,
  ) {
    try {
      const multiJob = await Promise.all(
        addNewJobsDto.jobs.map(async (item) => {
          const job = await this.jobService.addNewJob(item);
          await this.jobService.addCorporationJob({
            jobId: job.id,
            corporationId,
          });
          return job;
        }),
      );
      await this.redis.del(GET_JOB + `{${addNewJobsDto.jobs[0].title}}`);
      return multiJob;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Get()
  async GetJobById(@Query('id') id: string): Promise<JobDetail> {
    try {
      const job = await this.jobService.getJobById(id);
      console.log(Object.values(job)[1][0].id);
      const relevant = await this.corporationService.getLocationForCorporation(
        Object.values(job)[1][0].id,
      );
      const { files } = await this.getImages(Object.values(job)[1][0].id);
      Object.values(job)[1][0].location = relevant;
      Object.values(job)[1][0].images = files;
      return job;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Get('all/corporation')
  public async GetAllJobInCorporation(
    @Query('id') id: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<JobFilterResponse> {
    try {
      const data = await this.jobService.getAllJobInCorporation(
        id,
        limit,
        offset,
      );
      const total = await this.jobService.getTotalJobsInCorporationForClient(
        id,
      );
      if (Object.values(total)[0] > 0 && data.length > 0) {
        await Promise.all(
          data.map(async (item) => {
            const relevant = await this.jobService.getAllDataForStudentByJobId(
              item.id,
            );
            item.details = relevant;

            const location =
              await this.corporationService.getLocationForCorporation(
                Object.values(item.details.corporation)[0].id,
              );
            Object.values(item.details.corporation)[0].location = location;
            const { files } = await this.getImages(
              Object.values(item.details.corporation)[0].id,
            );
            Object.values(item.details.corporation)[0].images = files;

            return item.details;
          }),
        );
        return { data, pagination: total };
      }

      return { data: [], pagination: { total: 0 } };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Get('all')
  public async GetAllJobForStudent(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<JobFilterResponse> {
    try {
      const data = await this.jobService.getAllJobForStudent(limit, offset);
      const total = await this.jobService.getTotalJobsForStudent();
      if (Object.values(total)[0] > 0 && data.length > 0) {
        await Promise.all(
          data.map(async (item) => {
            const relevant = await this.jobService.getAllDataForStudentByJobId(
              item.id,
            );
            item.details = relevant;
            if (!item.details.corporation) return item.details;
            const location =
              await this.corporationService.getLocationForCorporation(
                Object.values(item.details.corporation)[0].id,
              );
            Object.values(item.details.corporation)[0].location = location;
            const { files } = await this.getImages(
              Object.values(item.details.corporation)[0].id,
            );
            Object.values(item.details.corporation)[0].images = files;
            return item.details;
          }),
        );
        return { data, pagination: total };
      }

      return { data: [], pagination: { total: 0 } };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Patch()
  public async updateJob(
    @Query('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
  ) {
    try {
      const result = await this.jobService.UpdateJob(id, updateJobDto);
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
  public async getImages(id: string): Promise<GetAllForOwnerResponse> {
    try {
      const { files } = await firstValueFrom(
        this.fileService
          .getAllForOwner({ ownerId: id })
          .pipe(timeout(defaultTimeout)),
      );

      if (!files) return { files: [] };
      return { files };
    } catch (error) {
      this.logger.error('Error from storage service: ', error.message);
      return { files: [] };
    }
  }
}

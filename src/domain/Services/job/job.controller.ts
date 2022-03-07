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
import { InjectRedis, Redis } from '@svtslv/nestjs-ioredis';
import { GET_JOB } from '../../../constants/cacheKey.constant';
import { AddNewJobsDto } from './dtos/addNewJob.dto';
import { UpdateJobDto } from './dtos/updateJob.dto';
import { JobService } from './Job.service';

@Controller('job')
export class JobController {
  private readonly logger = new Logger('JobController');

  constructor(
    private jobService: JobService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Post()
  async addNewJob(@Body() addNewJobsDto: AddNewJobsDto) {
    try {
      const multiJob = await Promise.all(
        addNewJobsDto.jobs.map(async (item) => {
          const job = await this.jobService.addNewJob(item);
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

  @Get('jobId')
  async GetJobById(@Query('id') id: string) {
    try {
      const job = await this.jobService.getJobById(id);
      if (!Object.values(job)[0]?.id)
        throw new HttpException(
          `Corporation does not have that id. Please try again ...`,
          HttpStatus.BAD_REQUEST,
        );
      return job;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Get('all')
  public async GetAllJob(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    try {
      const data = await this.jobService.getAllJob(limit, offset);
      const total = await this.jobService.getTotalJobsForClient();
      console.log(data.length);
      console.log(Object.values(total)[0]);
      if (Object.values(total)[0] > 0 && data.length > 0) {
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
}

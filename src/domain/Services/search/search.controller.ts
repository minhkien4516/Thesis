import { defaultTimeout } from './../../../constants/timeout.constant';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Query,
} from '@nestjs/common';
import { InjectRedis, Redis } from '@svtslv/nestjs-ioredis';
import { FilesService } from '../files/files.service';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  private readonly logger = new Logger('SearchController');

  constructor(
    private readonly searchService: SearchService,
    @InjectRedis() private readonly redis: Redis,
    private readonly fileService: FilesService,
  ) {}

  @Get('title')
  async GetJobByTitle(
    @Query('name') name: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<any> {
    try {
      const job = await this.searchService.getJobByTitle(name, limit, offset);
      console.log(Object.values(job)[0]);
      // if (Object.keys(job)[0] == '0') return { job: [] };
      return JSON.parse(JSON.stringify(Object.values(job)[0]));
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
  @Get('city')
  async GetJobByCity(
    @Query('name') name: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<any> {
    try {
      const job = await this.searchService.getJobByCity(name, limit, offset);
      console.log(Object.values(job)[0]);
      // if (Object.keys(job)[0] == '0') return { job: [] };
      return JSON.parse(JSON.stringify(Object.values(job)[0]));
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Get('corporation')
  async GetJobByCorporation(
    @Query('name') name: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<any> {
    try {
      const job = await this.searchService.getJobByCorporation(
        name,
        limit,
        offset,
      );
      console.log(Object.values(job)[0]);
      // if (Object.keys(job)[0] == '0') return { job: [] };
      return JSON.parse(JSON.stringify(Object.values(job)[0]));
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Get('skill')
  async GetJobBySkill(
    @Query('name') name: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<any> {
    try {
      const job = await this.searchService.getJobBySkill(name, limit, offset);
      console.log(Object.values(job)[0]);
      // if (Object.keys(job)[0] == '0') return { job: [] };
      return Object.values(job)[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Get('level')
  async GetJobByLevel(
    @Query('name') name: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<any> {
    try {
      const job = await this.searchService.getJobByLevel(name, limit, offset);
      console.log(Object.keys(job)[0]);
      // if (Object.keys(job)[0] == '0') return { job: [] };
      return job;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}

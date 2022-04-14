import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Query,
} from '@nestjs/common';
import { firstValueFrom, timeout } from 'rxjs';
import { defaultTimeout } from '../../../constants/timeout.constant';
import { GetAllForOwnerResponse } from '../../interfaces';
import { JobFilterResponse } from '../../interfaces/getJobForClients.interface';
import { CorporationService } from '../corporation/corporation.service';
import { FilesService } from '../files/files.service';
import { JobService } from '../job/job.service';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  private readonly logger = new Logger('SearchController');

  constructor(
    private readonly searchService: SearchService,
    @InjectRedis() private readonly redis: Redis,
    private readonly fileService: FilesService,
    private readonly corporationService: CorporationService,
    private readonly jobService: JobService,
  ) {}

  @Get('title')
  async GetJobByTitle(
    @Query('name') name: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<JobFilterResponse> {
    if (name.trim() == '') return { data: [], pagination: { total: 0 } };
    try {
      const data = await this.searchService.getJobByTitle(name, limit, offset);
      const total = await this.searchService.getTotalJobsByTitle(name);
      if (Object.values(total)[0] > 0 && data.length > 0) {
        await Promise.all(
          data.map(async (item) => {
            const relevant = await this.searchService.getAllDataForTitleByJobId(
              item.id,
              name,
            );
            item.details = relevant;
            console.log(item.details);
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
  @Get('city')
  async GetJobByCity(
    @Query('name') name: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<JobFilterResponse> {
    if (name.trim() == '') return { data: [], pagination: { total: 0 } };
    try {
      const data = await this.searchService.getJobByCity(name, limit, offset);
      const total = await this.searchService.getTotalJobsByCity(name);
      if (Object.values(total)[0] > 0 && data.length > 0) {
        await Promise.all(
          data.map(async (item) => {
            const relevant = await this.searchService.getAllDataForCityByJobId(
              item.id,
              name,
            );
            item.details = relevant;
            console.log(item.details);
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

  @Get('corporation')
  async GetJobByCorporation(
    @Query('name') name: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<JobFilterResponse> {
    if (name.trim() == '') return { data: [], pagination: { total: 0 } };
    try {
      const data = await this.searchService.getJobByCorporation(
        name,
        limit,
        offset,
      );
      const total = await this.searchService.getTotalJobsByCorporation(name);
      if (Object.values(total)[0] > 0 && data.length > 0) {
        await Promise.all(
          data.map(async (item) => {
            const relevant =
              await this.searchService.getAllDataForCorporationByJobId(
                item.id,
                name,
              );
            item.details = relevant;
            console.log(item.details);
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

  @Get('skill')
  async GetJobBySkill(
    @Query('name') name: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<JobFilterResponse> {
    if (name.trim() == '') return { data: [], pagination: { total: 0 } };
    try {
      const data = await this.searchService.getJobBySkill(name, limit, offset);
      const total = await this.searchService.getTotalJobsBySkill(name);
      if (Object.values(total)[0] > 0 && data.length > 0) {
        await Promise.all(
          data.map(async (item) => {
            const relevant = await this.searchService.getAllDataForSkillByJobId(
              item.id,
              name,
            );
            item.details = relevant;
            console.log(item.details);
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

  @Get('level')
  async GetJobByLevel(
    @Query('name') name: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<JobFilterResponse> {
    if (name.trim() == '') return { data: [], pagination: { total: 0 } };
    try {
      const data = await this.searchService.getJobByLevel(name, limit, offset);
      const total = await this.searchService.getTotalJobsByLevel(name);
      if (Object.values(total)[0] > 0 && data.length > 0) {
        await Promise.all(
          data.map(async (item) => {
            const relevant = await this.searchService.getAllDataForLevelByJobId(
              item.id,
              name,
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

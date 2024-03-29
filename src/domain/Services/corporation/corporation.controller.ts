import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { firstValueFrom, timeout } from 'rxjs';
import { GET_CORPORATION } from '../../../constants/cacheKey.constant';
import { FilesService } from '../files/files.service';
import { CorporationService } from './corporation.service';
import { AddNewCorporationDto } from './dtos/addNewCorporation.dto';
import {
  GetAllForOwnerResponse,
  UploadFilesForOwnerResponse,
} from '../../interfaces';
import { CorporationFilter } from '../../interfaces/getCorporationForClients.interface';
import { defaultTimeout } from '../../../constants/timeout.constant';
import { CorporationFilterResponse } from '../../interfaces/getCorporationForClients.interface';
import { UpdateCorporationDto } from './dtos/updateCorporation.dto';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Controller('corporation')
export class CorporationController {
  private readonly logger = new Logger('CorporationController');

  constructor(
    private readonly corporationService: CorporationService,
    @InjectRedis() private readonly redis: Redis,
    private readonly fileService: FilesService,
  ) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files' }]))
  public async addNewCorporation(
    @Body() addNewCorporation: AddNewCorporationDto,
    @UploadedFiles() files: { files?: Express.Multer.File[] },
  ): Promise<CorporationFilter> {
    try {
      const result = await this.corporationService.addNewCorporation({
        ...addNewCorporation,
      });
      if (result.length > 0)
        await this.uploadImages(Object.values(result)[0].id, files.files);
      await Promise.all(
        result.map(async (item) => {
          const { files } = await this.getImages(item.id);
          item.images = files;
          return item.images;
        }),
      );
      await this.redis.del(
        GET_CORPORATION + `${addNewCorporation.presenterId}`,
      );
      return result[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
  @Get('all')
  public async GetAllCorporation(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<CorporationFilterResponse> {
    try {
      const data = await this.corporationService.getAllCorporation(
        limit,
        offset,
      );
      const total =
        await this.corporationService.getTotalCorporationsForClient();
      console.log(data.length);
      console.log(Object.values(total)[0]);
      if (Object.values(total)[0] > 0 && data.length > 0) {
        await Promise.all(
          data.map(async (item) => {
            const relevant =
              await this.corporationService.getLocationForCorporation(item.id);
            const subresource =
              await this.corporationService.getReviewForCorporation(item.id);
            const { files } = await this.getImages(item.id);
            item.images = files;
            item.location = relevant;
            item.review = subresource;
            return {
              details: item.images,
              location: item.location,
              review: item.review,
            };
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

  @Get('presenter')
  async GetCorporationByPresenterId(@Query('id') id: string) {
    try {
      const corporation =
        await this.corporationService.getCorporationByPresenterId(id);
      console.log(Object.values(corporation)[0]);
      if (Object.values(corporation)[0] == undefined) {
        return { corporation: [] };
      } else {
        const { files } = await this.getImages(
          Object.values(corporation)[0].id,
        );
        Object.values(corporation)[0].images = files;
        return { corporation };
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Get()
  async GetCorporationById(@Query('id') id: string) {
    try {
      const corporation = await this.corporationService.getCorporationById(id);
      console.log(Object.values(corporation)[0]);

      if (Object.values(corporation)[0] == undefined) {
        return { corporation: [] };
      } else {
        const { files } = await this.getImages(
          Object.values(corporation)[0].id,
        );
        Object.values(corporation)[0].images = files;
        return { corporation };
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Get('filter')
  async GetCorporationByName(@Query('name') name: string) {
    try {
      const corporation = await this.corporationService.getCorporationByName(
        name,
      );
      console.log(Object.values(corporation)[0]);

      if (Object.values(corporation)[0] == undefined) {
        return { corporation: [] };
      } else {
        const { files } = await this.getImages(
          Object.values(corporation)[0].id,
        );
        Object.values(corporation)[0].images = files;
        return { corporation };
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Patch()
  public async updateCorporation(
    @Query('id') id: string,
    @Body() updateCorporationDto: UpdateCorporationDto,
  ) {
    try {
      const result = await this.corporationService.UpdateCorporation(
        id,
        updateCorporationDto,
      );
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Patch('activate')
  public async activateCorporation(@Query('id') id: string) {
    try {
      const result = await this.corporationService.ActivateCorporation(id);
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

  public async uploadImages(
    corporationId: string,
    filesParam: Express.Multer.File[],
  ): Promise<UploadFilesForOwnerResponse> {
    const file = filesParam.map((index) => ({
      filename: index.originalname,
      buffer: index.buffer,
      mimetype: index.mimetype,
    }));
    const files = await firstValueFrom(
      this.fileService.uploadForOwner({
        ownerId: corporationId,
        files: file,
      }),
    );
    return {
      urls: files[0],
    };
  }
  catch(error) {
    this.logger.error('Error from storage service: ', error.message);
    return { urls: [] };
  }

  @Get('report')
  public async getCorporationReportForClient(
    @Query('academicYear') academicYear: string,
  ) {
    try {
      const report =
        await this.corporationService.getCorporationReportForClient(
          academicYear,
        );
      const totalOfCorporation =
        await this.corporationService.getTotalCorporationReportForClient(
          academicYear,
        );
      return {
        report,
        totalCorporation: Object.values(totalOfCorporation)[0],
        numberOfActiveCorporation: Object.values(totalOfCorporation)[1],
        numberOfInActiveCorporation: Object.values(totalOfCorporation)[2],
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}

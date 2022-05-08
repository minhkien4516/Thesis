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
import { firstValueFrom, timeout } from 'rxjs';
import { FilesService } from '../files/files.service';
import { ReviewService } from './review.service';
import {
  GetAllForOwnerResponse,
  UploadFilesForOwnerResponse,
} from '../../interfaces';
import { defaultTimeout } from '../../../constants/timeout.constant';
import { AddNewReviewsDto } from './dtos/addNewReview.dto';

@Controller('review')
export class ReviewController {
  private readonly logger = new Logger('ReviewController');

  constructor(
    private readonly reviewService: ReviewService,
    private readonly fileService: FilesService,
  ) {}

  @Post()
  async addNewCorporationReview(
    @Query('corporationId') corporationId: string,
    @Body() addNewReviewsDto: AddNewReviewsDto,
  ) {
    try {
      const multiReview = await Promise.all(
        addNewReviewsDto.review.map(async (item) => {
          const review = await this.reviewService.addNewReview(item);
          await this.reviewService.addCorporationReview({
            reviewId: review.id,
            corporationId,
          });
          if (item.subReview.length < 0) return [];
          item.subReview.map(async (sub) => {
            const subReview = await this.reviewService.addNewSubReview(sub);
            await this.reviewService.addReviewWithSubReview({
              reviewId: review.id,
              subReviewId: subReview.id,
            });
          });
          return item;
        }),
      );
      return multiReview;
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
}

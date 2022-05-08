import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseError, QueryTypes } from 'sequelize';
import { Review } from '../../Models/review.model';
import { AddNewReviewDto } from './dtos/addNewReview.dto';
import { AddNewSubReviewDto } from './dtos/addNewSubReview.dto';
import { SubReview } from '../../Models/sub-review.model';
import { AddCorporationReviewDto } from './dtos/addCorporationReview.dto';
import { AddReviewWithSubReviewDto } from './dtos/addReviewWithSubReview.dto';

@Injectable()
export class ReviewService {
  private readonly logger = new Logger('ReviewService');

  constructor(private readonly sequelize: Sequelize) {}

  public async addNewReview(addNewReviewDto: AddNewReviewDto): Promise<Review> {
    try {
      const inserted = await this.sequelize.query(
        'SP_AddNewReview @title=:title, @comment=:comment,' +
          '@isRecommendable=:isRecommendable, @rating=:rating',
        {
          type: QueryTypes.SELECT,
          replacements: {
            ...addNewReviewDto,
          },
          raw: true,
          mapToModel: true,
          model: Review,
        },
      );
      console.log(inserted);
      return inserted[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  public async addNewSubReview(
    addNewSubReviewDto: AddNewSubReviewDto,
  ): Promise<SubReview> {
    try {
      const inserted = await this.sequelize.query(
        'SP_AddNewSubReview @content=:content, @rating=:rating',
        {
          type: QueryTypes.SELECT,
          replacements: {
            ...addNewSubReviewDto,
          },
          raw: true,
          mapToModel: true,
          model: SubReview,
        },
      );
      console.log(inserted);
      return inserted[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  public async addCorporationReview(
    addCorporationReviewDto: AddCorporationReviewDto,
  ): Promise<any> {
    try {
      const inserted = await this.sequelize.query(
        'SP_AddCorporationReview @reviewId=:reviewId, @corporationId=:corporationId',
        {
          type: QueryTypes.SELECT,
          replacements: {
            ...addCorporationReviewDto,
          },
          raw: true,
        },
      );
      console.log(inserted);
      return inserted[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  public async addReviewWithSubReview(
    addReviewWithSubReviewDto: AddReviewWithSubReviewDto,
  ): Promise<any> {
    try {
      const inserted = await this.sequelize.query(
        'SP_AddReviewWithSubReview @reviewId=:reviewId, @subReviewId=:subReviewId',
        {
          type: QueryTypes.SELECT,
          replacements: {
            ...addReviewWithSubReviewDto,
          },
          raw: true,
        },
      );
      console.log(inserted);
      return inserted[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}

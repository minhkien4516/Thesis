import { AddNewSubReviewDto } from './addNewSubReview.dto';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class AddNewReviewDto {
  @IsString()
  @IsNotEmpty()
  title?: string | null;

  @IsString()
  @IsNotEmpty()
  comment?: string | null;

  @IsString()
  @IsNotEmpty()
  isRecommendable?: string | null;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  rating?: number | null;

  @IsString()
  @IsNotEmpty()
  subReview?: [AddNewSubReviewDto];
}

export class AddNewReviewsDto {
  review: [AddNewReviewDto];
}

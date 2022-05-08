import { IsNotEmpty, IsString } from 'class-validator';

export class AddReviewWithSubReviewDto {
  @IsNotEmpty()
  @IsString()
  reviewId!: string;

  @IsNotEmpty()
  @IsString()
  subReviewId!: string;
}

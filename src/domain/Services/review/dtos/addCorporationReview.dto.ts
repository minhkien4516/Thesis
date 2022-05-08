import { IsNotEmpty, IsString } from 'class-validator';

export class AddCorporationReviewDto {
  @IsNotEmpty()
  @IsString()
  reviewId!: string;

  @IsNotEmpty()
  @IsString()
  corporationId!: string;
}

import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class AddNewSubReviewDto {
  @IsString()
  @IsNotEmpty()
  content?: string | null;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  rating?: number | null;
}

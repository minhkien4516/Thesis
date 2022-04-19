import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class AddNewJobDto {
  @IsString()
  @IsNotEmpty()
  title?: string | null;

  @IsString()
  @IsNotEmpty()
  description?: string | null;

  @IsString()
  @IsNotEmpty()
  dateCreated?: string | null;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  numberCandidate?: number | null;
}

export class AddNewJobsDto {
  jobs: [AddNewJobDto];
}

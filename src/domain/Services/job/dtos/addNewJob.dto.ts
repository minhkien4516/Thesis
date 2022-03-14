import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class AddNewJobDto {
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsString()
  @IsNotEmpty()
  dateCreated?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  numberCandidate?: number;
}

export class AddNewJobsDto {
  jobs: [AddNewJobDto];
}

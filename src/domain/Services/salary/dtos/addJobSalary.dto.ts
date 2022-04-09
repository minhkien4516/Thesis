import { IsNotEmpty, IsString } from 'class-validator';

export class AddJobSalaryDto {
  @IsNotEmpty()
  @IsString()
  jobId!: string;

  @IsNotEmpty()
  @IsString()
  salaryId!: string;
}

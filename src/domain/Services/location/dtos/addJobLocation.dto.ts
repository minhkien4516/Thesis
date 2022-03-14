import { IsNotEmpty, IsString } from 'class-validator';

export class AddJobLocationDto {
  @IsNotEmpty()
  @IsString()
  jobId!: string;

  @IsNotEmpty()
  @IsString()
  locationId!: string;
}

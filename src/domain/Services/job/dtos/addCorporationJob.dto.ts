import { IsNotEmpty, IsString } from 'class-validator';

export class AddCorporationJobDto {
  @IsNotEmpty()
  @IsString()
  jobId!: string;

  @IsNotEmpty()
  @IsString()
  corporationId!: string;
}

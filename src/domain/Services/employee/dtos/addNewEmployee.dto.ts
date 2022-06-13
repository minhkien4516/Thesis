import { IsNotEmpty, IsString } from 'class-validator';

export class AddNewEmployeeDto {
  @IsString()
  @IsNotEmpty()
  studentId?: string | null;

  @IsString()
  @IsNotEmpty()
  jobId?: string | null;

  @IsString()
  @IsNotEmpty()
  cvId?: string | null;
}

export class AddNewEmployeesDto {
  candidates: [AddNewEmployeeDto];
}

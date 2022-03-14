import { IsNotEmpty, IsString } from 'class-validator';

export class AddJobSkillDto {
  @IsNotEmpty()
  @IsString()
  jobId!: string;

  @IsNotEmpty()
  @IsString()
  skillsId!: string;
}

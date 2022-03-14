import { IsNotEmpty, IsString } from 'class-validator';

export class AddNewSkillDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  level?: string;
}

export class AddNewSkillsDto {
  skills: [AddNewSkillDto];
}

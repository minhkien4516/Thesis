import { IsNotEmpty, IsString } from 'class-validator';

export class AddNewSkillDto {
  @IsString()
  @IsNotEmpty()
  name?: string | null;

  @IsString()
  @IsNotEmpty()
  level?: string | null;

  @IsString()
  @IsNotEmpty()
  position?: string | null;
}

export class AddNewSkillsDto {
  skills: [AddNewSkillDto];
}

import { SkillService } from './skill.service';
import { Module } from '@nestjs/common';
import { SkillController } from './skill.controller';

@Module({
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}

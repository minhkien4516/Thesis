import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GET_SKILL } from '../../../constants/cacheKey.constant';
import { AddNewSkillsDto } from './dtos/addNewSkill.dto';
import { UpdateSkillDto } from './dtos/updateSkill.dto';
import { SkillService } from './skill.service';

@Controller('skill')
export class SkillController {
  private readonly logger = new Logger('SkillController');

  constructor(
    private skillService: SkillService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Post()
  async addNewJobSkill(
    @Query('jobId') jobId: string,
    @Body() addNewSkillsDto: AddNewSkillsDto,
  ) {
    try {
      const multiSkill = await Promise.all(
        addNewSkillsDto.skills.map(async (item) => {
          const skill = await this.skillService.addNewSkill(item);
          console.log(skill);
          await this.skillService.addJobSkill({
            skillsId: skill.id,
            jobId,
          });
          return skill;
        }),
      );
      await this.redis.del(GET_SKILL + `{${addNewSkillsDto.skills[0].name}}`);
      return multiSkill;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Patch()
  public async updateSkill(
    @Query('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ) {
    try {
      const result = await this.skillService.UpdateSkill(id, updateSkillDto);
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}

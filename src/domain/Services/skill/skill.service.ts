import { DatabaseError } from 'sequelize';
import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { Skill } from '../../Models/skill.model';
import { AddNewSkillDto } from './dtos/addNewSkill.dto';
import { AddJobSkillDto } from './dtos/addJobSkill.dto';
import { UpdateSkillDto } from './dtos/updateSkill.dto';
import slugify from 'vietnamese-slug';
@Injectable()
export class SkillService {
  private readonly logger = new Logger('SkillService');

  constructor(private readonly sequelize: Sequelize) {}

  public async addNewSkill(addNewSkillDto: AddNewSkillDto): Promise<Skill> {
    try {
      if (!addNewSkillDto.name) return null;
      const slug = slugify(addNewSkillDto.name, {
        lower: true,
        trim: true,
        replacement: '-',
      });
      const inserted = await this.sequelize.query(
        'SP_AddNewSkill @name=:name, @level=:level, @position=:position, @slug=:slug',
        {
          type: QueryTypes.SELECT,
          replacements: {
            name: addNewSkillDto.name,
            level: addNewSkillDto.level,
            position: addNewSkillDto.position,
            slug,
          },
          raw: true,
          mapToModel: true,
          model: Skill,
        },
      );
      console.log(inserted);
      return inserted[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  public async addJobSkill(addJobSkillDto: AddJobSkillDto): Promise<any> {
    try {
      const inserted = await this.sequelize.query(
        'SP_AddJobSkill  @skillsId=:skillsId,@jobId=:jobId',
        {
          type: QueryTypes.SELECT,
          replacements: {
            ...addJobSkillDto,
          },
          raw: true,
        },
      );
      console.log(inserted);
      return inserted[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async UpdateSkill(id: string, updateSkillDto?: UpdateSkillDto) {
    try {
      const updated = await this.sequelize.query(
        'SP_UpdateSkill @id=:id,@name=:name, @level=:level, @position=:position, @slug=:slug',
        {
          type: QueryTypes.SELECT,
          replacements: {
            id,
            name: updateSkillDto.name ?? null,
            level: updateSkillDto.level ?? null,
            position: updateSkillDto.position ?? null,
            slug: updateSkillDto.slug ?? null,
          },
          raw: true,
          mapToModel: true,
          model: Skill,
        },
      );
      console.log(updated[0]);
      updated[0].slug = slugify(updated[0].name);
      return updated[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}

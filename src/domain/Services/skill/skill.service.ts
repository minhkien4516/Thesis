import { DatabaseError } from 'sequelize';
import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { Skill } from '../../Models/skill.model';
import { AddNewSkillDto } from './dtos/addNewSkill.dto';
import { AddJobSkillDto } from './dtos/addJobSkill.dto';
import { UpdateSkillDto } from './dtos/updateSkill.dto';
@Injectable()
export class SkillService {
  private readonly logger = new Logger('SkillService');

  constructor(private readonly sequelize: Sequelize) {}

  public async addNewSkill(addNewJobDto: AddNewSkillDto): Promise<Skill> {
    try {
      const inserted = await this.sequelize.query(
        'SP_AddNewSkill @name=:name, @level=:level',
        {
          type: QueryTypes.SELECT,
          replacements: {
            ...addNewJobDto,
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

  async UpdateSkill(id: string, updateSkillDto: UpdateSkillDto) {
    try {
      const updated = await this.sequelize.query(
        'SP_UpdateSkill @id=:id,@name=:name, @level=:level',
        {
          type: QueryTypes.UPDATE,
          replacements: {
            id,
            ...updateSkillDto,
          },
          raw: true,
          mapToModel: true,
          model: Skill,
        },
      );
      return updated[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}

import { DatabaseError } from 'sequelize';
import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { AddNewSalaryDto } from './dtos/addNewSalary.dto';
import { AddJobSalaryDto } from './dtos/addJobSalary.dto';
import { Salary } from '../../Models/salary.model';
import { UpdateSalaryDto } from './dtos/updateSalary.dto';
@Injectable()
export class SalaryService {
  private readonly logger = new Logger('SalaryService');

  constructor(private readonly sequelize: Sequelize) {}

  public async addNewSalary(addNewSalaryDto: AddNewSalaryDto): Promise<Salary> {
    try {
      const inserted = await this.sequelize.query(
        'SP_AddNewSalary @gt=:gt, @lt=:lt,@unit=:unit',
        {
          type: QueryTypes.SELECT,
          replacements: {
            gt: addNewSalaryDto.gt,
            lt: addNewSalaryDto.lt,
            unit: addNewSalaryDto.unit,
          },
          raw: true,
          mapToModel: true,
          model: Salary,
        },
      );
      console.log(inserted);
      return inserted[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  public async addJobSalary(addJobSalaryDto: AddJobSalaryDto): Promise<any> {
    try {
      const inserted = await this.sequelize.query(
        'SP_AddJobSalary  @salaryId=:salaryId,@jobId=:jobId',
        {
          type: QueryTypes.SELECT,
          replacements: {
            ...addJobSalaryDto,
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

  async UpdateSalary(id: string, updateSalaryDto: UpdateSalaryDto) {
    try {
      const updated = await this.sequelize.query(
        'SP_UpdateSalary @id=:id,@gt=:gt, @lt=:lt,@unit=:unit',
        {
          type: QueryTypes.UPDATE,
          replacements: {
            id,
            gt: updateSalaryDto.gt,
            lt: updateSalaryDto.lt,
            unit: updateSalaryDto.unit,
          },
          raw: true,
          mapToModel: true,
          model: Salary,
        },
      );
      return updated[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}

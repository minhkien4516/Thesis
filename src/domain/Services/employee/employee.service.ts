import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseError, QueryTypes } from 'sequelize';
import { Employee } from '../../Models/employee.model';
import { AddNewEmployeeDto } from './dtos/addNewEmployee.dto';
import { AddCorporationEmployeeDto } from './dtos/addCorporationEmployee.dto';
import { EmployeeFilter } from '../../interfaces/getEmployeeForClients.interface';

@Injectable()
export class EmployeeService {
  private readonly logger = new Logger('EmployeeService');

  constructor(private readonly sequelize: Sequelize) {}

  public async addNewEmployee(
    addNewEmployeeDto: AddNewEmployeeDto,
  ): Promise<Employee> {
    try {
      const inserted = await this.sequelize.query(
        'SP_AddNewEmployee @studentId=:studentId, @cvId=:cvId,' +
          '@jobId=:jobId',
        {
          type: QueryTypes.SELECT,
          replacements: {
            ...addNewEmployeeDto,
          },
          raw: true,
          mapToModel: true,
          model: Employee,
        },
      );
      console.log(inserted);
      return inserted[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  public async addCorporationEmployee(
    addCorporationEmployeeDto: AddCorporationEmployeeDto,
  ): Promise<any> {
    try {
      const inserted = await this.sequelize.query(
        'SP_AddCorporationEmployee @employeeId=:employeeId, @corporationId=:corporationId',
        {
          type: QueryTypes.SELECT,
          replacements: {
            ...addCorporationEmployeeDto,
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

  public async getAllCandidate(
    limit?: number,
    offset?: number,
  ): Promise<EmployeeFilter[]> {
    try {
      if (limit < 1 || offset < 0) return [];
      const total: EmployeeFilter[] = await this.sequelize.query(
        'SP_GetAllCandidate @limit=:limit,@offset=:offset',
        {
          type: QueryTypes.SELECT,
          replacements: {
            limit,
            offset,
          },
          raw: true,
        },
      );
      return total;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getTotalCandidate() {
    try {
      const total = await this.sequelize.query('SP_GetTotalCandidate ', {
        type: QueryTypes.SELECT,
        raw: true,
        mapToModel: true,
        model: Employee,
      });
      return total[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}

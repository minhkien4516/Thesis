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
import { GET_SALARY } from '../../../constants/cacheKey.constant';
import { AddNewSalaryDto } from './dtos/addNewSalary.dto';
import { UpdateSalaryDto } from './dtos/updateSalary.dto';
import { SalaryService } from './salary.service';

@Controller('salary')
export class SalaryController {
  private readonly logger = new Logger('SalaryController');

  constructor(
    private salaryService: SalaryService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Post()
  async addNewJob(
    @Query('jobId') jobId: string,
    @Body() addNewSalaryDto: AddNewSalaryDto,
  ) {
    try {
      const salary = await this.salaryService.addNewSalary({
        ...addNewSalaryDto,
      });
      console.log(salary);
      await this.salaryService.addJobSalary({
        salaryId: salary.id,
        jobId,
      });
      await this.redis.del(
        GET_SALARY + `{${addNewSalaryDto.gt}+${addNewSalaryDto.lt}}`,
      );
      return salary;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Patch()
  public async updateSalary(
    @Query('id') id: string,
    @Body() updateSalaryDto: UpdateSalaryDto,
  ) {
    try {
      const result = await this.salaryService.UpdateSalary(id, updateSalaryDto);
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

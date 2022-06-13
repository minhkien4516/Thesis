import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { AddNewEmployeesDto } from './dtos/addNewEmployee.dto';
import { EmployeeService } from './employee.service';
import { EmployeeFilterResponse } from '../../interfaces/getEmployeeForClients.interface';
import { JobService } from '../job/job.service';
import { CorporationService } from '../corporation/corporation.service';
import { FilesService } from '../files/files.service';
import {
  GetAllForOwnerResponse,
  UploadFilesForOwnerResponse,
} from '../../interfaces';
import { firstValueFrom, timeout } from 'rxjs';
import { defaultTimeout } from '../../../constants/timeout.constant';
import {
  ResumeFilterRequest,
  ResumeFilterResponse,
} from '../../interfaces/getRésumeForClients.interface';
import { UniversityService } from '../university/university.service';

@Controller('employee')
export class EmployeeController {
  private readonly logger = new Logger('EmployeeController');

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jobService: JobService,
    private readonly corporationService: CorporationService,
    private readonly fileService: FilesService,
    private readonly universityService: UniversityService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Post()
  async addNewJob(
    @Query('corporationId') corporationId: string,
    @Body() addNewEmployeesDto: AddNewEmployeesDto,
  ) {
    try {
      const candidate = await Promise.all(
        addNewEmployeesDto.candidates.map(async (item) => {
          const employee = await this.employeeService.addNewEmployee(item);
          await this.employeeService.addCorporationEmployee({
            employeeId: employee.id,
            corporationId,
          });
          return employee;
        }),
      );
      return {
        candidate,
        message:
          'Thanks for apply your CV to my company.Good Luck to You and Have a nice day',
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Get('all/candidate')
  public async GetAllJobForStudent(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<EmployeeFilterResponse> {
    try {
      const data = await this.employeeService.getAllCandidate(limit, offset);
      const total = await this.employeeService.getTotalCandidate();
      if (Object.values(total)[0] > 0 && data.length > 0) {
        await Promise.all(
          data.map(async (item) => {
            const temp = await this.getResumeForStudent(
              item.studentId,
              item.cvId,
            );
            item.cvDetail = temp.data;
            const relevant = await this.jobService.getAllDataForStudentByJobId(
              item.jobId,
            );
            item.jobDetail = relevant;
            if (!item.jobDetail.corporation) return item.jobDetail;
            const location =
              await this.corporationService.getLocationForCorporation(
                Object.values(item.jobDetail.corporation)[0].id,
              );
            Object.values(item.jobDetail.corporation)[0].location = location;
            const { files } = await this.getImages(
              Object.values(item.jobDetail.corporation)[0].id,
            );
            Object.values(item.jobDetail.corporation)[0].images = files;
            return { ...item.jobDetail, ...item.cvDetail };
          }),
        );
        return { data, pagination: total };
      }

      return { data: [], pagination: { total: 0 } };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  public async getImages(id: string): Promise<GetAllForOwnerResponse> {
    try {
      const { files } = await firstValueFrom(
        this.fileService
          .getAllForOwner({ ownerId: id })
          .pipe(timeout(defaultTimeout)),
      );

      if (!files) return { files: [] };
      return { files };
    } catch (error) {
      this.logger.error('Error from storage service: ', error.message);
      return { files: [] };
    }
  }

  public async uploadImages(
    corporationId: string,
    filesParam: Express.Multer.File[],
  ): Promise<UploadFilesForOwnerResponse> {
    const file = filesParam.map((index) => ({
      filename: index.originalname,
      buffer: index.buffer,
      mimetype: index.mimetype,
    }));
    const files = await firstValueFrom(
      this.fileService.uploadForOwner({
        ownerId: corporationId,
        files: file,
      }),
    );
    return {
      urls: files[0],
    };
  }
  catch(error) {
    this.logger.error('Error from storage service: ', error.message);
    return { urls: [] };
  }

  public async getResumeForStudent(
    id: string,
    cvId: string,
  ): Promise<ResumeFilterResponse> {
    try {
      const data = await firstValueFrom(
        this.universityService.getResumeForClient({
          id,
          cvId,
        }),
      );
      return data;
    } catch (error) {
      this.logger.error(
        'Error when get full cv for student from user service: ',
        error.message,
      );
      return { data: [] };
    }
  }
}

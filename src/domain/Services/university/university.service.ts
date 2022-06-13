import {
  ResumeFilterRequest,
  ResumeFilterResponse,
} from './../../interfaces/getRésumeForClients.interface';
import { Controller, Inject, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import { Observable } from 'rxjs';
import { universityPackageProvideToken } from '../../../constants/university.constant';

interface IUniversityService {
  getResumeForClient(
    data: ResumeFilterRequest,
  ): Observable<ResumeFilterResponse>;
}

@Controller()
export class UniversityService implements IUniversityService, OnModuleInit {
  private universityService!: IUniversityService;
  private readonly logger = new Logger(UniversityService.name);

  constructor(
    @Inject(universityPackageProvideToken) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.universityService = this.client.getService<IUniversityService>(
      UniversityService.name,
    );
  }

  getResumeForClient(
    data: ResumeFilterRequest,
  ): Observable<ResumeFilterResponse> {
    return this.universityService.getResumeForClient(data);
  }
}

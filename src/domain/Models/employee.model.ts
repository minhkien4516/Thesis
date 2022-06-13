import { Model } from 'sequelize-typescript';

export class Employee extends Model {
  id: string;
  studentId: string;
  jobId: string;
  cvId: string;
  startDate: Date | string;
  endDate: Date | string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

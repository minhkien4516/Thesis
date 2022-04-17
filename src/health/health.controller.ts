import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  SequelizeHealthIndicator,
} from '@nestjs/terminus';
import { defaultTimeout } from '../constants/timeout.constant';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthService: HealthCheckService,
    private readonly db: SequelizeHealthIndicator,
  ) {}

  @Get()
  // @HealthCheck()
  // @ApiTags('Health')
  check() {
    // return this.healthService.check([
    //   async () => this.db.pingCheck('database', { timeout: defaultTimeout }),
    return {
      status: 'DATABASE CLONE',
      data: [
        {
          id: '81A2E11A-ACCF-4303-90E5-D702291E7369',
          title: 'Back-end Developer',
          description:
            'Top 3 Reasons To Join Us Diversity, supportive & committed team. Learn more from early-stage startups Dynamic work environment Job Description Participating in system analysis and design, overall design, database design, building API to Architect and build robust, scalable, highly available, reliable, and secure backend systems. Participate in design discussions, code reviews, and group brainstorming sessions. Deliver high-quality code following best practices for better performance, user experience, andTroubleshoot existing codebases, hunt nasty bugs and refactor code.Your Skills and Experience',
          dateCreated: '1900-01-01T09:00:00.000Z',
          numberCandidate: 1200,
          isActive: true,
          isRegistered: true,
          createdAt: '2022-04-12T08:27:22.000Z',
          updatedAt: '2022-04-12T08:27:22.000Z',
          details: {
            corporation: [
              {
                id: '9C13BC82-69CB-4BFA-BA24-60DCC7D79DEE',
                name: 'DXC Technology Services VietNam',
                hotline: '123213721',
                email: 'abc@gmail.com',
                presenterId: '1',
                overtimeRequire: 'Monday-Friday',
                special: 'Outsourcing',
                startWorkTime: '09:00:00',
                endWorkTime: '18:00:00',
                origin: 'America',
                numberEmployees: 3000,
                slug: 'dxc-technology-services-vietnam',
                isActive: true,
                isRegistered: true,
                createdAt: '2022-04-12T08:26:31',
                updatedAt: '2022-04-12T08:26:31',
                location: [
                  {
                    id: 'FB035F64-D8BA-415A-91FA-FAD0DC0F348B',
                    country: 'Viet Nam',
                    city: 'Ho Chi Minh City',
                    district: '04',
                    ward: 'Phu thuan',
                    street: 'Nguyen Van Quy',
                    details: '88/89/15/5',
                    slug: 'ho-chi-minh-city',
                    isActive: true,
                    isRegistered: true,
                    createdAt: '2022-04-12T08:27:03',
                    updatedAt: '2022-04-12T08:27:03',
                  },
                ],
                images: [],
              },
            ],
            skill: [
              {
                id: '14A46348-93EA-4067-A105-5F985BD6FBBC',
                name: 'JavaScript',
                level: 'Senior Developer',
                position: 'Backend',
                slug: 'javascript',
                isActive: true,
                isRegistered: true,
                createdAt: '2022-04-12T08:28:35',
                updatedAt: '2022-04-12T08:28:35',
              },
            ],
            location: [
              {
                id: '817C8C97-DB20-4215-9C37-17761411BAEF',
                country: 'VietNam',
                city: 'Ha Noi',
                district: 'Hoang kiem',
                ward: 'ward',
                street: 'Nguyen Van Quy',
                details: '88/89/15/5',
                slug: 'ha-noi',
                isActive: true,
                isRegistered: true,
                createdAt: '2022-04-12T08:27:43',
                updatedAt: '2022-04-12T08:27:43',
              },
              {
                id: 'DCFC0C14-A57D-47CC-A036-8D88744530F6',
                country: 'VietNam',
                city: 'Ho Chi Minh',
                district: '4',
                ward: 'ward',
                street: 'Nguyen Van Quy',
                details: '88/89/15/5',
                slug: 'ho-chi-minh',
                isActive: true,
                isRegistered: true,
                createdAt: '2022-04-12T08:28:08',
                updatedAt: '2022-04-12T08:28:08',
              },
            ],
            salary: [
              {
                id: '0FDE7E00-EC4D-47DF-81EB-6003DED974F1',
                gt: 1500000,
                lt: 3000000,
                unit: 'VND',
                isActive: true,
                isRegistered: true,
                createdAt: '2022-04-12T08:29:12',
                updatedAt: '2022-04-12T08:29:12',
              },
            ],
          },
        },
        {
          id: '33F5725F-33CA-4049-A578-0C17C8C3D62C',
          title: 'Front-end Developer',
          description:
            'Top 3 Reasons To Join Us Diversity, supportive & committed team. Learn more from early-stage startups Dynamic work environment Job Description Participating in system analysis and design, overall design, database design, building API to Architect and build robust, scalable, highly available, reliable, and secure backend systems. Participate in design discussions, code reviews, and group brainstorming sessions. Deliver high-quality code following best practices for better performance, user experience, andTroubleshoot existing codebases, hunt nasty bugs and refactor code.Your Skills and Experience',
          dateCreated: '1900-01-01T09:00:00.000Z',
          numberCandidate: 1200,
          isActive: true,
          isRegistered: true,
          createdAt: '2022-04-12T08:27:22.000Z',
          updatedAt: '2022-04-12T08:27:22.000Z',
          details: {
            corporation: [
              {
                id: '9C13BC82-69CB-4BFA-BA24-60DCC7D79DEE',
                name: 'DXC Technology Services VietNam',
                hotline: '123213721',
                email: 'abc@gmail.com',
                presenterId: '1',
                overtimeRequire: 'Monday-Friday',
                special: 'Outsourcing',
                startWorkTime: '09:00:00',
                endWorkTime: '18:00:00',
                origin: 'America',
                numberEmployees: 3000,
                slug: 'dxc-technology-services-vietnam',
                isActive: true,
                isRegistered: true,
                createdAt: '2022-04-12T08:26:31',
                updatedAt: '2022-04-12T08:26:31',
                location: [
                  {
                    id: 'FB035F64-D8BA-415A-91FA-FAD0DC0F348B',
                    country: 'Viet Nam',
                    city: 'Ho Chi Minh City',
                    district: '04',
                    ward: 'Phu thuan',
                    street: 'Nguyen Van Quy',
                    details: '88/89/15/5',
                    slug: 'ho-chi-minh-city',
                    isActive: true,
                    isRegistered: true,
                    createdAt: '2022-04-12T08:27:03',
                    updatedAt: '2022-04-12T08:27:03',
                  },
                ],
                images: [],
              },
            ],
            skill: [
              {
                id: '5FC199DD-F253-4EE5-BAB5-52877C081268',
                name: 'JavaScript',
                level: 'Senior Developer',
                position: 'Backend',
                slug: 'javascript',
                isActive: true,
                isRegistered: true,
                createdAt: '2022-04-12T08:28:16',
                updatedAt: '2022-04-12T08:28:16',
              },
            ],
            location: [
              {
                id: '817C8C97-DB20-4215-9C37-17761411BAEF',
                country: 'VietNam',
                city: 'Ha Noi',
                district: 'Hoang kiem',
                ward: 'ward',
                street: 'Nguyen Van Quy',
                details: '88/89/15/5',
                slug: 'ha-noi',
                isActive: true,
                isRegistered: true,
                createdAt: '2022-04-12T08:27:43',
                updatedAt: '2022-04-12T08:27:43',
              },
              {
                id: 'DCFC0C14-A57D-47CC-A036-8D88744530F6',
                country: 'VietNam',
                city: 'Ho Chi Minh',
                district: '4',
                ward: 'ward',
                street: 'Nguyen Van Quy',
                details: '88/89/15/5',
                slug: 'ho-chi-minh',
                isActive: true,
                isRegistered: true,
                createdAt: '2022-04-12T08:28:08',
                updatedAt: '2022-04-12T08:28:08',
              },
            ],
            salary: [
              {
                id: '94839E31-1283-47E3-AF65-5822C40C0DA1',
                gt: 1500000,
                lt: 3000000,
                unit: 'VND',
                isActive: true,
                isRegistered: true,
                createdAt: '2022-04-12T08:29:22',
                updatedAt: '2022-04-12T08:29:22',
              },
            ],
          },
        },
      ],
      pagination: {
        total: 2,
      },
    };
    // ]);
  }
}

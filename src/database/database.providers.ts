import { ConfigService } from '@nestjs/config';
import { from } from 'rxjs';
import { Sequelize } from 'sequelize-typescript';
import { databaseToken } from '../constants/database.constant';
import { Corporation } from '../domain/Models/corporation.model';
import { Job } from '../domain/Models/job.model';
import { Location } from '../domain/Models/location.model';
import { Review } from '../domain/Models/review.model';
import { Skill } from '../domain/Models/skill.model';
import { SubReview } from '../domain/Models/sub-review.model';

export const databaseProviders = [
  {
    provide: databaseToken,
    inject: [ConfigService],
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mssql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      sequelize.authenticate();
      sequelize.addModels([
        Corporation,
        Job,
        Location,
        Review,
        Skill,
        SubReview,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

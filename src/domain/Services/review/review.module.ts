import { ReviewService } from './review.service';
import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { FilesModule } from '../files/files.module';
@Module({
  imports: [FilesModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}

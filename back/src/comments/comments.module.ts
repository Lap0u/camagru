import { Module } from '@nestjs/common';
import { CommentsController } from './controllers/comments/comments.controller';
import { CommentsService } from './services/comments/comments.service';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}

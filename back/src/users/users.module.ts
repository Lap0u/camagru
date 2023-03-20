import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { CommentsService } from './services/comments/comments.service';
import { CommentsController } from './controllers/comments/comments.controller';
import { PicturesController } from './controllers/pictures/pictures.controller';

@Module({
  controllers: [UsersController, CommentsController, PicturesController],
  providers: [UsersService, CommentsService]
})
export class UsersModule {}

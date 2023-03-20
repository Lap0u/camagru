import { Module } from '@nestjs/common';
import { PicturesController } from './controllers/pictures/pictures.controller';
import { PicturesService } from './services/pictures/pictures.service';

@Module({
  controllers: [PicturesController],
  providers: [PicturesService],
})
export class PicturesModule {}

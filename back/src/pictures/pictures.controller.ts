import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('pictures')
@UseGuards(AuthGuard)
export class PicturesController {}

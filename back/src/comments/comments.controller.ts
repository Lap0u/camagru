import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('comments')
@UseGuards(AuthGuard)
export class CommentsController {}

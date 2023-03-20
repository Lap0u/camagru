import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { CommentsModule } from './comments/comments.module';
import { PicturesModule } from './pictures/pictures.module';
import { Comments } from './comments/comments.entity';
import { Pictures } from './pictures/pictures.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number.parseInt(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [User, Comments, Pictures],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    CommentsModule,
    PicturesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

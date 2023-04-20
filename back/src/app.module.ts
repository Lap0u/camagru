import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { CommentsModule } from './comments/comments.module';
import { PicturesModule } from './pictures/pictures.module';
import { Comments } from './entities/comments.entity';
import { Pictures } from './entities/pictures.entity';
import { AuthModule } from './auth/auth.module';

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
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

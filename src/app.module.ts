import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import * as dotenv from 'dotenv';
import { EventEmitterModule } from '@nestjs/event-emitter';
import * as Joi from 'joi';

dotenv.config();
@Module({
  imports: [AuthModule, MongooseModule.forRoot(process.env.DB_URI), ConfigModule.forRoot(
    {
      isGlobal: true,
      envFilePath: ['.env'],
      validationSchema: Joi.object({
        DB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
      }),
    }
  ), UserModule, BookModule,EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [AuthModule, MongooseModule.forRoot(process.env.DB_URI), ConfigModule.forRoot(
    {
      isGlobal: true,
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

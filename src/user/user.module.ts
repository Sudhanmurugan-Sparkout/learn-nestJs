import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { IsPositivePipe } from 'src/common/pipes/IsPositive.pipes';

@Module({
  imports: [ MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), JwtModule.register({}),AuthModule],
  controllers: [UserController],
  providers: [UserService,IsPositivePipe],

})
export class UserModule {}

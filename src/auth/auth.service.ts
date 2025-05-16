import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './auth.model';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async login(data) {
    const user = await this.authModel.findOne({ email: data.email });
    if (!user) throw new InternalServerErrorException('User not found');
    const isPasswordValid = await argon.verify(user.password, data.password);
    if (!isPasswordValid)
      throw new InternalServerErrorException('Password is incorrect');
    const token = await this.createToken(user);
    return {
      user,
      token,
    };
  }

  async register(data) {
   
      const hasedPaswword = await argon.hash(data.password);
      const user = await this.authModel.create({
        ...data,
        password: hasedPaswword,
      });
      return user;
  }

  async createToken(data: any): Promise<string> {
    const payload = { email: data.email, id: data._id };
    return await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }

  async findOne(id: string) {
    return await this.authModel.findById(id);
  }
}

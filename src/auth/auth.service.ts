import { Injectable ,InternalServerErrorException , ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './auth.model';
import * as argon from 'argon2';
import { manualErrorHandling } from '../common/helper/manual-error-handling';

@Injectable()
export class AuthService {

    constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}
    async login(data) {
        const user = await this.authModel.findOne({ email: data.email });
        if (!user) throw new InternalServerErrorException('User not found');
        const isPasswordValid = await argon.verify(user.password, data.password);
        if (!isPasswordValid) throw new InternalServerErrorException('Password is incorrect');
        return await this.authModel.find();
    }

    async register(data) {
        try {
        data.password = await argon.hash(data.password);
        const newUser = new this.authModel(data);
        return await newUser.save();
        } catch (error) {
            manualErrorHandling(error);
        }
    }
}

import { Controller, Post ,Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto , LoginAuthDto} from'./dto';

@Controller('auth')

export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('login')
    login( @Body() dto : LoginAuthDto){
        return this.authService.login(dto);
    }
    @Post('register')
    register(@Body() dto : RegisterAuthDto){
        return this.authService.register(dto);
    }
}

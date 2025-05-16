import { Controller, Post ,Body, UseInterceptors} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto , LoginAuthDto} from'./dto';
import { ErrorHandlerInterceptor } from 'src/common/interceptor/error-handler.interceptor';

@Controller('auth')

export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('login')
    login( @Body() dto : LoginAuthDto){
        return this.authService.login(dto);
    }

    @Post('register')
    @UseInterceptors(ErrorHandlerInterceptor)
    register(@Body() dto : RegisterAuthDto){
        return this.authService.register(dto);
    }
}

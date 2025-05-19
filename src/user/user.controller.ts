import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ConflictException,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { AuthService } from 'src/auth/auth.service';
import { IsPositivePipe } from 'src/common/pipes/IsPositive.pipes';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService, private readonly IsPositivePipe: IsPositivePipe) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Query('page', IsPositivePipe) page: number) {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, IsPositivePipe) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return {
      message: 'User deleted successfully',
      data: this.userService.remove(id),
    }
  }
}

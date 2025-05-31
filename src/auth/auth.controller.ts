import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  async googleRedirect() {}

  @Get('auth/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleHandleRedirect(@Req() req) {
    return req.user;
  }
}

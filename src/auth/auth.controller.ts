import { Controller, Get, HttpException, Req, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'generated/prisma';

@Controller()
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  async googleRedirect() {}

  @Get('auth/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleHandleRedirect(@Req() req) {
    const userPayload = req.user;

    if (!userPayload)
      throw new HttpException(
        'Something went wrong, please try again later.',
        500,
      );

    const user: User = await this.usersService.findOrCreateUser(userPayload);

    return user;
  }
}

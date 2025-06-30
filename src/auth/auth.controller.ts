import { Controller, Get, HttpException, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { type Profile } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  async googleRedirect() {}

  @Get('auth/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleHandleRedirect(@Req() req) {
    const userPayload: Profile | undefined | null = req.user;

    if (!userPayload)
      throw new HttpException(
        'Something went wrong, please try again later.',
        500,
      );

    return await this.authService.validateUser(userPayload);
  }
}

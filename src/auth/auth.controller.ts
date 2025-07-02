import {
  Controller,
  Get,
  HttpException,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { type Profile } from 'passport-google-oauth20';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  async googleRedirect() {}

  @Get('auth/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleHandleRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userPayload = req.user as Profile | undefined | null;

    if (!userPayload) {
      throw new HttpException(
        'Something went wrong, please try again later.',
        500,
      );
    }

    const { accessToken } = await this.authService.authenticate(userPayload);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.redirect(this.configService.get<string>('CLIENT_URL'));
  }

  @Get('auth/me')
  getMe(@Req() req: Request) {
    return req.user;
  }
}

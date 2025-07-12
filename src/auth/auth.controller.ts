import {
  Controller,
  Get,
  HttpException,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { type Profile } from 'passport-google-oauth20';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { RequestService } from 'src/common/services/request.service';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly requestService: RequestService,
    private readonly usersService: UsersService,
  ) {}

  @Get('google')
  @UseGuards(PassportAuthGuard('google'))
  async googleRedirect() {}

  @Get('google/redirect')
  @UseGuards(PassportAuthGuard('google'))
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

  @Get('me')
  @UseGuards(AuthGuard)
  getMe() {
    const payload = this.requestService.getUserPayload();

    return this.usersService.findUserById(payload.sub);
  }
}

import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { TokenPayload } from '../@types/auth.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OptionalProtectMiddleware implements NestMiddleware {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.access_token;

    if (token) {
      try {
        const payload: TokenPayload = this.jwtService.verify(token, {
          secret: this.configService.get<string>('JWT_SECRET'),
        });
        const user = await this.usersService.findUserById(payload.sub);

        if (user) {
          req.user = user;
        }
      } catch (err) {
        // Do nothing
      }
    }

    next();
  }
}

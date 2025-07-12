import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { TokenPayload } from '../@types/auth.types';
import { ConfigService } from '@nestjs/config';
import { RequestService } from '../services/request.service';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly requestService: RequestService,
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
          this.requestService.setUserPayload(payload);
        }
      } catch (err) {
        // Do nothing
      }
    }

    next();
  }
}

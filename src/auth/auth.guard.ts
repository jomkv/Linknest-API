import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from 'src/common/@types/auth.types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    try {
      const user = request?.user as TokenPayload | undefined;

      if (!user) {
        return false;
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}

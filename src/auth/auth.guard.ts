import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { RequestService } from 'src/common/services/request.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly requestService: RequestService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    try {
      const userPayload = this.requestService.getUserPayload();

      if (!userPayload) {
        throw new UnauthorizedException();
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}

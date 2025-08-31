import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RequestService } from 'src/common/services/request.service';
import { Observable } from 'rxjs';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CustomGoogleGuard
  extends AuthGuard('google')
  implements CanActivate
{
  constructor(private readonly requestService: RequestService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const sessionId = request.query.id as string;

    const nonce = crypto.randomUUID();

    await this.saveNonce(nonce, sessionId);

    this.requestService.setSessionNonce(nonce); // error here

    // Delegate logic onto parent guard
    return super.canActivate(context) as boolean | Promise<boolean>;
  }

  getAuthenticateOptions(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    return {
      scope: ['profile', 'email'],
      state: this.requestService.getSessionNonce(), // error here
    };
  }

  saveNonce(nonce: string, sessionId: string) {
    // todo: save nonce at redis
  }
}

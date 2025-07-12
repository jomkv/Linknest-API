import { Injectable, Scope } from '@nestjs/common';
import { TokenPayload } from '../@types/auth.types';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  private userPayload: TokenPayload;

  setUserPayload(payload: TokenPayload) {
    this.userPayload = payload;
  }

  getUserPayload() {
    return this.userPayload;
  }
}

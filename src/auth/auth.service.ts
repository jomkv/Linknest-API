import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'generated/prisma';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import {
  AuthInput,
  SignInData,
  AuthResult,
  TokenPayload,
} from 'src/common/@types/auth.types';
import { RedisService } from 'src/redis/redis.service';
import { EventsGateway } from 'src/events/event.gateway';
import { WS_AUTH_MESSAGE } from 'src/common/constants/socket-messages.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user);
  }

  async validateUser(input: AuthInput): Promise<SignInData> {
    const user: User = await this.usersService.findOrCreateUser(input);

    return {
      userId: String(user.id),
      displayName: user.displayName,
    };
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const { displayName, userId } = user;

    const payload: TokenPayload = {
      sub: userId,
      displayName,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken, displayName, userId };
  }

  async emitSuccess(nonce: string) {
    const sessionId = await this.redisService.get(`nonce:${nonce}`);

    if (!sessionId) return;

    this.eventsGateway.emitToSession(sessionId, WS_AUTH_MESSAGE.COMPLETE, {});
  }
}

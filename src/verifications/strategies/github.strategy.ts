import { Strategy } from 'passport-github2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: `${configService.get<string>('BASE_URL')}/verifications/callback/github`,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: string,
  ): Promise<any> {
    return profile;
  }
}

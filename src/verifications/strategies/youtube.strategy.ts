import { Strategy } from 'passport-youtube-v3';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class YoutubeStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: `${configService.get<string>('BASE_URL')}/auth/google/redirect`, // TODO: change
      scope: ['https://www.googleapis.com/auth/youtube'],
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

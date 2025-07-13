import { Strategy } from 'passport-spotify';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy) {
  // TODO: Can only set this up once app is deployed, need secure connection for callback
}

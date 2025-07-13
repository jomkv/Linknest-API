import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { VerificationsService } from './verifications.service';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Profile as GithubProfile } from 'passport-github2';

@Controller('verifications')
export class VerificationsController {
  constructor(private readonly verificationsService: VerificationsService) {}

  @Get('github')
  @UseGuards(PassportAuthGuard('github'))
  async githubRedirect() {}

  @Get('callback/github')
  @UseGuards(PassportAuthGuard('github'))
  async githubHandleCallback(@Req() req: Request) {
    return req.user;
  }

  @Get('discord')
  @UseGuards(PassportAuthGuard('discord'))
  async discordRedirect() {}

  @Get('callback/discord')
  @UseGuards(PassportAuthGuard('discord'))
  async discordHandleCallback(@Req() req: Request) {
    return req.user;
  }

  @Get('youtube') // TODO: fix credentials
  @UseGuards(PassportAuthGuard('youtube'))
  async youtubeRedirect() {}

  @Get('callback/youtube') // TODO: register endpoint at google console
  @UseGuards(PassportAuthGuard('youtube'))
  async youtubeHandleCallback(@Req() req: Request) {
    return req.user;
  }
}

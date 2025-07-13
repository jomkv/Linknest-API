import { Module } from '@nestjs/common';
import { VerificationsService } from './verifications.service';
import { VerificationsController } from './verifications.controller';
import { ConfigModule } from '@nestjs/config';
import { GithubStrategy } from './strategies/github.strategy';
import { DiscordStrategy } from './strategies/discord.strategy';
import { YoutubeStrategy } from './strategies/youtube.strategy';

@Module({
  imports: [ConfigModule],
  controllers: [VerificationsController],
  providers: [
    VerificationsService,
    GithubStrategy,
    DiscordStrategy,
    YoutubeStrategy,
  ],
})
export class VerificationsModule {}

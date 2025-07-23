import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { VerificationsModule } from 'src/verifications/verifications.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, VerificationsModule, ConfigModule],
  providers: [LinksService],
  controllers: [LinksController],
  exports: [LinksService],
})
export class LinksModule {}

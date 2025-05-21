import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';

@Module({
  imports: [PrismaModule],
  providers: [LinksService],
  controllers: [LinksController],
})
export class LinksModule {}

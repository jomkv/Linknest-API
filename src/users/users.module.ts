import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersController } from './users.controller';
import { LinksModule } from 'src/links/links.module';

@Module({
  providers: [UsersService],
  imports: [PrismaModule, LinksModule],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

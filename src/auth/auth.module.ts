import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LinksModule } from 'src/links/links.module';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { GoogleStrategy } from './google.strategy';

@Module({
  exports: [AuthService],
  imports: [LinksModule, UsersModule],
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

import {
  Controller,
  Get,
  HttpException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'generated/prisma';
import { LinksService } from 'src/links/links.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestService } from 'src/common/services/request.service';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly linksService: LinksService,
    private readonly requestService: RequestService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('links')
  async getUserLinks() {
    const user = this.requestService.getUserPayload();

    const links = await this.linksService.getUserLinks(Number(user.sub));
    return {
      message: "User's links fetched",
      data: links,
    };
  }

  @Get(':displayName')
  async getProfile(@Param('displayName') displayName: string) {
    const user: User | null =
      await this.usersService.findUserByDisplayName(displayName);

    if (!user) {
      throw new HttpException('User not found.', 404);
    }

    const userLinks = await this.linksService.getUserLinks(user.id);

    return { ...user, links: userLinks };
  }
}

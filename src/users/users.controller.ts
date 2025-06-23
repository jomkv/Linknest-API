import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'generated/prisma';
import { LinksService } from 'src/links/links.service';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly linksService: LinksService,
  ) {}

  @Get('user/:displayName')
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

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dtos/create-link.dto';
import { UpdateLinkDto } from './dtos/update-link.dto';
import { LinkExistsPipe } from './pipes/link-exists.pipe';
import { Link, User } from 'generated/prisma';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestService } from 'src/common/services/request.service';

@Controller('links')
@UseGuards(AuthGuard)
export class LinksController {
  constructor(
    private readonly linksService: LinksService,
    private readonly requestService: RequestService,
  ) {}

  @Get(':id')
  async getLink(@Param('id', ParseIntPipe) id: number) {
    const link: Link | null = await this.linksService.getLink(id);

    if (!link) throw new HttpException('Link not found.', 404);

    return link;
  }

  @Post()
  @UsePipes(ValidationPipe)
  createLink(@Req() req: Request, @Body() createLinkDto: CreateLinkDto) {
    const user = this.requestService.getUserPayload();

    return this.linksService.createLink(Number(user.sub), createLinkDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  editLink(
    @Body() editLinkDto: UpdateLinkDto,
    @Param('id', ParseIntPipe, LinkExistsPipe) link: Link,
  ) {
    return this.linksService.editLink(link.id, editLinkDto);
  }

  @Delete(':id')
  async deleteLink(@Param('id', ParseIntPipe, LinkExistsPipe) link: Link) {
    const deletedLink: Link = await this.linksService.deleteLink(link.id);

    return {
      message: 'Link deleted',
      data: deletedLink,
    };
  }

  @Patch('id/toggle')
  toggleLinkVisibility(@Param('id', ParseIntPipe, LinkExistsPipe) link: Link) {
    return this.linksService.toggleLinkVisibility(link.id, link.isEnabled);
  }
}

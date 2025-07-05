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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dtos/create-link.dto';
import { UpdateLinkDto } from './dtos/update-link.dto';
import { LinkExistsPipe } from './pipes/link-exists.pipe';
import { Link, User } from 'generated/prisma';
import { Request } from 'express';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get(':id')
  async getLink(@Param('id', ParseIntPipe) id: number) {
    const link: Link | null = await this.linksService.getLink(id);

    if (!link) throw new HttpException('Link not found.', 404);

    return link;
  }

  @Post()
  @UsePipes(ValidationPipe)
  createLink(@Req() req: Request, @Body() createLinkDto: CreateLinkDto) {
    const user = req.user as User;

    return this.linksService.createLink(user.id, createLinkDto);
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
  deleteLink(@Param('id', ParseIntPipe, LinkExistsPipe) link: Link) {
    return this.linksService.deleteLink(link.id);
  }

  @Patch('id/toggle')
  toggleLinkVisibility(@Param('id', ParseIntPipe, LinkExistsPipe) link: Link) {
    return this.linksService.toggleLinkVisibility(link.id, link.isEnabled);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get(':id')
  getLink(@Param('id', ParseIntPipe) id: number) {
    return this.linksService.getLink(id);
  }

  @Post() // TODO: DTO
  createLink(@Body() createLinkDto: any) {
    return this.linksService.createLink(createLinkDto);
  }

  @Patch(':id') // TODO: DTO
  editLink(@Body() editLinkDto: any, @Param('id', ParseIntPipe) id: number) {
    return this.linksService.editLink(id, editLinkDto);
  }

  @Delete(':id')
  deleteLink(@Param('id', ParseIntPipe) id: number) {
    return this.linksService.deleteLink(id);
  }

  @Patch('id/toggle')
  toggleLinkVisibility(@Param('id', ParseIntPipe) id: number) {
    return this.toggleLinkVisibility(id);
  }
}

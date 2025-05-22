import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dtos/create-link.dto';
import { UpdateLinkDto } from './dtos/update-link.dto';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get(':id')
  getLink(@Param('id', ParseIntPipe) id: number) {
    return this.linksService.getLink(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createLink(@Body() createLinkDto: CreateLinkDto) {
    return this.linksService.createLink(createLinkDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  editLink(
    @Body() editLinkDto: UpdateLinkDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
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

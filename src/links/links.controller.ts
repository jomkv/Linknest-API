import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Res,
  UnprocessableEntityException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dtos/create-link.dto';
import { UpdateLinkDto } from './dtos/update-link.dto';
import { Link } from 'generated/prisma';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RequestService } from 'src/common/services/request.service';
import { LinkOwnerGuard } from './guards/link-owner.guard';
import { LinkParam } from './decorators/link.decorator';
import { VerificationsService } from 'src/verifications/verifications.service';
import { Providers } from 'src/common/@types/providers.types';
import { Response } from 'express';

@Controller('links')
@UseGuards(AuthGuard)
export class LinksController {
  constructor(
    private readonly linksService: LinksService,
    private readonly requestService: RequestService,
    private readonly verificationService: VerificationsService,
  ) {}

  @Get(':id')
  @UseGuards(LinkOwnerGuard)
  async getLink(@LinkParam() link: Link) {
    return link;
  }

  @Post()
  createLink(@Body(ValidationPipe) createLinkDto: CreateLinkDto) {
    const user = this.requestService.getUserPayload();

    return this.linksService.createLink(Number(user.sub), createLinkDto);
  }

  @Put(':id')
  @UseGuards(LinkOwnerGuard)
  editLink(
    @Body(ValidationPipe) editLinkDto: UpdateLinkDto,
    @LinkParam() link: Link,
  ) {
    return this.linksService.editLink(link.id, editLinkDto);
  }

  @Delete(':id')
  @UseGuards(LinkOwnerGuard)
  async deleteLink(@LinkParam() link: Link) {
    const deletedLink: Link = await this.linksService.deleteLink(link.id);

    return {
      message: 'Link deleted',
      data: deletedLink,
    };
  }

  @Patch(':id/toggle')
  @UseGuards(LinkOwnerGuard)
  toggleLinkVisibility(@LinkParam() link: Link) {
    return this.linksService.toggleLinkVisibility(link.id, link.isEnabled);
  }

  @Patch(':id/verify')
  @UseGuards(LinkOwnerGuard)
  verifyLink(@LinkParam() link: Link, @Res() res: Response) {
    const domain: Providers | null =
      this.verificationService.getAllowedProvider(link.link);

    if (!domain) {
      throw new UnprocessableEntityException("Link's domain is unsupported.");
    }

    return res.redirect(`/verifications/${domain}?link_id=${link.id}`);
  }
}

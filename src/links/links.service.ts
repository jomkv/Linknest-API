import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LinksService {
  constructor(private readonly prisma: PrismaService) {}

  getLink(id: number) {
    // TODO
  }

  // TODO: UPDATE ARG TYPES
  createLink(newLink: any) {
    // TODO
  }

  // TODO: UPDATE ARG TYPES
  editLink(id: number, updatedLink: any) {
    // TODO
  }

  deleteLink(id: number) {
    // TODO
  }

  toggleLinkVisibility(id: number) {
    // TODO
  }
}

import { Injectable } from '@nestjs/common';
import { Link, Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LinksService {
  constructor(private readonly prisma: PrismaService) {}

  getLink(id: number): Promise<Link | null> {
    return this.prisma.link.findUnique({
      where: { id },
    });
  }

  async createLink(newLink: Prisma.LinkCreateInput) {
    const importDynamic = new Function(
      'modulePath',
      'return import(modulePath)',
    );
    const { default: normalizeUrl } = await importDynamic('normalize-url');

    return this.prisma.link.create({
      data: {
        ...newLink,
        link: normalizeUrl(newLink.link),
      },
    });
  }

  editLink(id: number, updatedLink: Prisma.LinkUpdateInput) {
    // TODO
  }

  deleteLink(id: number) {
    // TODO
  }

  toggleLinkVisibility(id: number) {
    // TODO
  }
}

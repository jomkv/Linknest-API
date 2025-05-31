import { Injectable } from '@nestjs/common';
import { Link, Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LinksService {
  constructor(private readonly prisma: PrismaService) {}

  private async normalizeUrlInput(url: string): Promise<string> {
    const importDynamic = new Function(
      'modulePath',
      'return import(modulePath)',
    );
    const { default: normalizeUrl } = await importDynamic('normalize-url');

    return normalizeUrl(url);
  }

  getLink(id: number): Promise<Link | null> {
    return this.prisma.link.findUnique({
      where: { id },
    });
  }

  async createLink(userId: number, newLink: Prisma.LinkCreateWithoutUserInput) {
    return this.prisma.link.create({
      data: {
        ...newLink,
        link: await this.normalizeUrlInput(newLink.link),
        userId,
      },
    });
  }

  async editLink(id: number, updatedLink: Prisma.LinkUpdateInput) {
    const data = { ...updatedLink };

    if (updatedLink.link) {
      data.link = await this.normalizeUrlInput(updatedLink.link as string);
    }

    return this.prisma.link.update({ where: { id }, data });
  }

  deleteLink(id: number) {
    return this.prisma.link.delete({ where: { id } });
  }

  toggleLinkVisibility(id: number, isEnabled: boolean) {
    return this.prisma.link.update({
      where: { id },
      data: { isEnabled: !isEnabled }, // Flip isEnabled value
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
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

  getUserLinks(userId: number): Promise<Link[] | []> {
    return this.prisma.link.findMany({ where: { userId } });
  }

  async createLink(userId: number, newLink: Prisma.LinkCreateWithoutUserInput) {
    const lastIndexResult = await this.prisma.link.aggregate({
      where: {
        userId,
      },
      _max: {
        index: true,
      },
    });

    const lastIndex = lastIndexResult._max.index ?? 0;
    const newIndex = lastIndex + 1;

    return this.prisma.link.create({
      data: {
        ...newLink,
        link: await this.normalizeUrlInput(newLink.link),
        userId,
        index: newIndex,
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

  async deleteLink(id: number) {
    return this.prisma.$transaction(async (prisma) => {
      const linkToDelete: Link | null = await this.getLink(id);

      if (!linkToDelete) {
        throw new NotFoundException('Link not found');
      }

      await prisma.link.delete({
        where: { id },
      });

      await prisma.link.updateMany({
        where: {
          userId: linkToDelete.userId,
          index: { gt: linkToDelete.index },
        },
        data: {
          index: { decrement: 1 },
        },
      });

      return linkToDelete;
    });
  }

  toggleLinkVisibility(id: number, isEnabled: boolean) {
    return this.prisma.link.update({
      where: { id },
      data: { isEnabled: !isEnabled }, // Flip isEnabled value
    });
  }
}

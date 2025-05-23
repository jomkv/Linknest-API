import {
  ArgumentMetadata,
  HttpException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { LinksService } from '../links.service';
import { Link } from 'generated/prisma';

/**
 * Pipe to check if a Link with the given ID exists.
 * - If the Link exists, it passes the found Link to the route handler.
 * - If not, it throws a 404 HttpException.
 *
 * Usage: Apply to route parameters to ensure the Link exists before proceeding.
 */
@Injectable()
export class LinkExistsPipe implements PipeTransform<number, Promise<Link>> {
  constructor(private readonly linksService: LinksService) {}

  async transform(value: number, metadata: ArgumentMetadata): Promise<Link> {
    const link = await this.linksService.getLink(value);

    if (!link) throw new HttpException('Link not found.', 404);

    return link;
  }
}

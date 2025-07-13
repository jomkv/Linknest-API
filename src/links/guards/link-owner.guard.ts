import {
  Injectable,
  CanActivate,
  ExecutionContext,
  InternalServerErrorException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { RequestService } from 'src/common/services/request.service';
import { LinksService } from '../links.service';
import isNumeric from 'src/common/utils/is-numeric';
import { RequestWithLink } from '../@types/request.types';

@Injectable()
export class LinkOwnerGuard implements CanActivate {
  constructor(
    private readonly requestService: RequestService,
    private readonly linksService: LinksService,
  ) {}

  /**
   * Validates if id param exists and is valid, user exists, link exists, and if user is the owner of the link.
   *
   * @param context - Execution Context.
   * @throws Varying error(s) if any of the checks fail.
   * @returns Passes the found link onto the request (accesible via req.link).
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestWithLink = context.switchToHttp().getRequest();
    const linkId: string | undefined = request.params.id;

    if (!linkId) {
      throw new InternalServerErrorException(
        'LinkOwnerGuard: Route parameter "id" is required.',
      );
    }

    if (!isNumeric(linkId)) {
      throw new InternalServerErrorException(
        'LinkOwnerGuard: Route parameter "id" must be a valid number.',
      );
    }

    const user = this.requestService.getUserPayload();
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const link = await this.linksService.getLink(Number(linkId));
    if (!link) {
      throw new NotFoundException('Link not found');
    }

    // Check if userId matches with link's userId
    if (Number(user.sub) !== link.userId) {
      throw new ForbiddenException('You do not own this link');
    }

    // Attach the link to the request for later use
    request.link = link;

    return true;
  }
}

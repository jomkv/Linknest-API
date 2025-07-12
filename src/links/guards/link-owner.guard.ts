import {
  Injectable,
  CanActivate,
  ExecutionContext,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { RequestService } from 'src/common/services/request.service';
import { LinksService } from '../links.service';
import isNumeric from 'src/common/utils/is-numeric';

@Injectable()
export class LinkOwnerGuard implements CanActivate {
  constructor(
    private readonly requestService: RequestService,
    private readonly linksService: LinksService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const linkId: string | undefined = request.params.id;

    if (!linkId) {
      throw new InternalServerErrorException(
        'LinkOwnerGuard: Route parameter "id" is required. Make sure this guard is used on routes with :id parameter.',
      );
    }

    if (!isNumeric(linkId)) {
      throw new InternalServerErrorException(
        'LinkOwnerGuard: Route parameter "id" must be a valid number.',
      );
    }

    return this.validateLinkOwnership(Number(linkId));
  }

  /**
   * Validates if user exists, link exists, and if user is the owner of the link.
   *
   * @param linkId ID of the link to be validated.
   * @throws Link from ID is not found.
   * @returns False if user not detected or if IDs dont match, True if IDs match.
   */
  private async validateLinkOwnership(linkId: number): Promise<boolean> {
    const user = this.requestService.getUserPayload();

    if (!user) {
      return false;
    }

    const link = await this.linksService.getLink(linkId);

    if (!link) {
      throw new NotFoundException('Link not found');
    }

    // Check if userId and link's userId matches
    return Number(user.sub) === link.id;
  }
}

import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Link } from 'generated/prisma';
import { RequestWithLink } from '../@types/request.types';

/**
 * Validates if link is in the request, and extracts this link for you.
 *
 * @throws Server Error if link not found within the request.
 * @returns The extracted link from the request.
 */
export const LinkParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Link => {
    const request: RequestWithLink = ctx.switchToHttp().getRequest();

    if (!request.link) {
      throw new InternalServerErrorException(
        'Link not found in request. Make sure LinkOwnerGuard is applied.',
      );
    }

    return request.link;
  },
);

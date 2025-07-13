import { Link } from 'generated/prisma';
import { Request } from 'express';

export interface RequestWithLink extends Request {
  link?: Link;
}

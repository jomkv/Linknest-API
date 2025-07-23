import { Injectable } from '@nestjs/common';
import { Providers } from 'src/common/@types/providers.types';
import { PROVIDERS } from 'src/common/constants/providers.constants';

@Injectable()
export class VerificationsService {
  constructor() {}

  getAllowedProvider(url: string): Providers | null {
    const domain = new URL(url).hostname.replace('www.', '').split('.')[0];

    return PROVIDERS[domain.toUpperCase()] || null;
  }
}

import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  createUser(newUser: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: newUser });
  }

  findUser(googleId: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { googleId } });
  }
}

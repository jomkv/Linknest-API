import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  createUser(newUser: any): Promise<User> {
    return this.prisma.user.create({
      data: {
        googleId: newUser.id,
        displayName: `${newUser.displayName.replace(/\s+/g, '').toLowerCase()}${newUser.id}`,
        email: newUser.emails[0].value,
      },
    });
  }

  findUser(googleId: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { googleId } });
  }

  async findOrCreateUser(userPayload: any): Promise<User> {
    let user: User | null = await this.findUser(userPayload.id);

    if (!user) {
      user = await this.createUser(userPayload);
    }

    return user;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';

import { SignInInput } from './dto/signin.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateLocalUser({ email, password }: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException('User Not Found');

    const passwordMatched = await argon2.verify(user.password, password);

    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid Credentials!');
    }

    return user;
  }
}

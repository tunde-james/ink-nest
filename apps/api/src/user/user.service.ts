import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const { password, ...user } = createUserInput;
    const hashedPassword = await argon2.hash(password);

    return await this.prisma.user.create({
      data: {
        password: hashedPassword,
        ...user,
      },
    });
  }
}

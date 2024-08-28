import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Repository } from './repository';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(public readonly prismaService: PrismaService) {
    super(prismaService.user);
  }
}

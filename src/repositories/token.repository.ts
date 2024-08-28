import { Injectable } from '@nestjs/common';
import { Repository } from './repository';
import { Token } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TokenRepository extends Repository<Token> {
  constructor(public readonly prisma: PrismaService) {
    super(prisma.token);
  }
}

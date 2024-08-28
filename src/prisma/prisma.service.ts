import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({ log: [{ emit: 'event', level: 'query' }] });
    this.logger.log(`Prisma v${Prisma.prismaVersion.client}`);
  }

  async onModuleInit() {
    this.$use(async (params, next) => {
      if (params.action === 'create' || params.action === 'update') {
        if (params.model === 'User' && params.args.data.password) {
          const password: string = params.args.data.password;
          const salt = 10;
          params.args.data.password = await bcrypt.hash(password, salt);
        }
      }
      return next(params);
    });
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

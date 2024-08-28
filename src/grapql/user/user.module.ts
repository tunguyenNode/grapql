import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserRepository } from '../../repositories/user.repository';

@Module({
  imports: [PrismaModule],
  providers: [UserResolver, UserService, UserRepository],
})
export class UserModule {}

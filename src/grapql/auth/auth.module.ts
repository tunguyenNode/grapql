import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaModule } from '../../prisma/prisma.module';
import { DeviceService, TokenService } from '../../services';
import { DeviceRepository, TokenRepository } from '../../repositories';

@Module({
  imports: [PrismaModule],
  providers: [
    AuthResolver,
    AuthService,
    DeviceService,
    DeviceRepository,
    TokenRepository,
    TokenService,
  ],
})
export class AuthModule {}

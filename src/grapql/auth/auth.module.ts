import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaModule } from '../../prisma/prisma.module';
import { DeviceService } from '../../services/device/device.service';
import { DeviceRepository } from '../../repositories/device.repository';
import { TokenService } from '../../services/token/token.service';
import { TokenRepository } from '../../repositories/token.repository';

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

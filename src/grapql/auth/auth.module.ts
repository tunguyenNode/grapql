import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaModule } from '../../prisma/prisma.module';
import { TokenService, DeviceService, UserService } from 'src/services/index';
import { TokenRepository, DeviceRepository, UserRepository } from 'src/repositories/index';
@Module({
  imports: [PrismaModule],
  providers: [AuthResolver, AuthService, DeviceService, DeviceRepository, TokenService, TokenRepository, UserRepository, UserService],
})
export class AuthModule {}

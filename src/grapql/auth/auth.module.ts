import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaModule } from '../../prisma/prisma.module';
import { DeviceService } from '../../services/device/device.service';
import { DeviceRepository } from '../../repositories/device.repository';

@Module({
  imports: [PrismaModule],
  providers: [AuthResolver, AuthService, DeviceService, DeviceRepository],
})
export class AuthModule {}

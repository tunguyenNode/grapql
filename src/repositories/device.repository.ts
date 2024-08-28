import { Injectable } from '@nestjs/common';
import { Repository } from './repository';
import { Device } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DeviceRepository extends Repository<Device> {
  constructor(public readonly prismaService: PrismaService) {
    super(prismaService.device);
  }
}

import { Injectable } from '@nestjs/common';
import { DeviceRepository } from '../../repositories/device.repository';

@Injectable()
export class DeviceService {
  constructor(private readonly repository: DeviceRepository) {}

  public createDevice = async (deviceInput: any) =>
    this.repository.store(deviceInput);
}

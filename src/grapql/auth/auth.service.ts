import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dto/login.input';
import { DeviceService } from '../../services/device/device.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly deviceService: DeviceService,
  ) {}

  /**
   *
   * @param input
   */
  async validateUser(input: LoginInput): Promise<any> {
    const user = await this.prismaService.user.findFirst({
      where: { email: input.email },
    });
    if (user && (await bcrypt.compare(input.password, user.password))) {
      return {
        ...user,
        password: undefined,
      };
    }
    return false;
  }

  /**
   *
   * @param user
   * @param context
   */
  async login(user: User, context: any) {
    const userAgent = context?.req.headers['user-agent'];
    const device = await this.deviceService.createDevice({
      userAgent: userAgent,
      userId: user.id,
    });
    console.log(device);
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

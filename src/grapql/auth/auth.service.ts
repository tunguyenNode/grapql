// @ts-ignore

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dto/login.input';
import { DeviceService } from '../../services/device/device.service';
import { User } from '@prisma/client';
import { TokenService } from '../../services/token/token.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly deviceService: DeviceService,
    private readonly tokenService: TokenService,
  ) {}

  /**
   *
   * @param input
   */
  async validateUser(input: LoginInput): Promise<User | false> {
    const user = await this.prismaService.user.findFirst({
      where: { email: input.email },
    });
    if (user && (await bcrypt.compare(input.password, user.password))) {
      return user;
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
    await this.deviceService.createDevice({
      userAgent: userAgent,
      userId: user.id,
    });
    const payload = {
      sub: user.id,
      email: user.email,
      jti: uuidv4(),
    };
    const tokens = await this.getTokens(payload);
    this.tokenService.saveToken(tokens, payload);
    return {
      ...tokens,
      ...user,
    };
  }

  /**
   * getTokens
   *
   * @param payload
   */
  async getTokens(payload: {
    sub: string | number;
    email: string;
    jti: string;
  }): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: 'loremisum',
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: 'loremisum',
        expiresIn: '7d',
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { TokenRepository } from '../../repositories/token.repository';

@Injectable()
export class TokenService {
  constructor(private repository: TokenRepository) {}

  public saveToken(
    tokens: { accessToken: string; refreshToken: string },
    payload: {
      sub: string | number;
      email: string;
      jti: string;
    },
  ) {
    // return this.repository.createMany();
  }
}

import { Injectable } from '@nestjs/common';
import { TokenRepository } from '../../repositories/token.repository';

@Injectable()
export class TokenService {
  constructor(private repository: TokenRepository) {}
}

import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class AuthResponse extends User {
  @Field()
  refreshToken: string;

  @Field()
  accessToken: string;
}

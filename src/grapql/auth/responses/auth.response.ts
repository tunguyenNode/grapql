import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class AuthResponse extends User {
  @Field()
  access_token: string;

  @Field()
  refresh_token: string;
}

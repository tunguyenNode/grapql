import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class meta {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: string;
  next: string;
}

@ObjectType()
export class ResponsePaginationEntity {
  @Field()
  data: Array<User>;

  @Field()
  meta: meta;
}

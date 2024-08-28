import { Field, InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field()
  @IsInt()
  page: number;
}

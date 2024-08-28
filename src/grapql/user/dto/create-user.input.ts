import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';
import { isUnique } from '../../../validations';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  @isUnique({ tableName: 'user', column: 'email' })
  email: string;

  @Field()
  @IsString()
  @MinLength(3, { message: 'password is short' })
  @MaxLength(15, { message: 'password is long' })
  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}

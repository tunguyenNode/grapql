import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';
import { IsExits, IsMongoObject } from '../../../validations';

@InputType()
export class UpdateUserInput {
  @IsNotEmpty()
  @IsString()
  @IsMongoObject()
  @IsExits({ tableName: 'user', column: 'id' })
  id: string;

  @Field()
  @IsString()
  @MinLength(3, { message: 'password is short' })
  @MaxLength(15, { message: 'password is short' })
  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}

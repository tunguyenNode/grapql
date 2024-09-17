import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString, MinLength, MaxLength } from "class-validator";
import { isUnique } from "src/validations";

@InputType()
export class SignupInput {
    @Field()
    @IsEmail()
    @IsString()
    @isUnique({tableName: "user", column: 'email'})
    email: string

    @Field()
    @IsString()
    @MinLength(3, { message: 'password is short' })
    @MaxLength(15, { message: 'password is long' })
    password: string;

    @Field()
    @IsString()
    firstName: string;

    @Field()
    @IsString()
    lastName: string;
}
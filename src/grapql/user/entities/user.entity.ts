import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum Status {
  Active,
  Inactive,
}

registerEnumType(Status, {
  name: 'Status',
});

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field()
  email: string;

  @Field()
  status: Status;

  @Field()
  password?: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}

import { registerDecorator, ValidationOptions } from 'class-validator';
import { ObjectId } from 'bson';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from '@nestjs/class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@ValidatorConstraint({ name: 'IsMongoObjectConstraint', async: true })
@Injectable()
export class IsMongoIdObjectConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async validate(value: any): Promise<boolean> {
    return !!ObjectId.isValid(value);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const field: string = validationArguments.property;
    return `${field} is not type ObjectId`;
  }
}

export function IsMongoObject(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsMongoIdObject',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsMongoIdObjectConstraint,
    });
  };
}

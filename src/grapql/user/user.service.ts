import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../../prisma/prisma.service';
import {
  PaginatedResult,
  PaginateFunction,
  paginator,
} from '../../helpers/paginator.helper';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../../repositories/user.repository';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userRepository: UserRepository,
  ) {}

  create = async (createUserInput: CreateUserInput) => {
    console.log(createUserInput);
    return this.userRepository.store(createUserInput);
  };

  /**
   *
   * @param where
   * @param orderBy
   * @param page
   */
  async findAll({
    where,
    orderBy,
    page,
  }: {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    page?: number;
  }): Promise<PaginatedResult<User>> {
    return paginate(
      this.prismaService.user,
      {
        where,
        orderBy,
      },
      {
        page,
      },
    );
  }

  findOne = async (id: string) => this.userRepository.findOne({ id: id });

  async update(id: string, updateUserInput: UpdateUserInput) {
    const data = {
      ...updateUserInput,
      id: undefined,
    };
    return this.userRepository.update(
      {
        id: id,
      },
      data,
    );
  }
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { PaginationInput } from './dto/pagination.input';
import { ResponsePaginationEntity } from './entities/responsePagination.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { name: 'createUser' })
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => ResponsePaginationEntity, { name: 'users' })
  async findAll(@Args('getUserInput') paginationInput: PaginationInput) {
    return this.userService.findAll({
      where: {
        status: 'Active',
      },
      orderBy: {
        id: 'asc',
      },
      page: paginationInput.page,
    });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User, { name: 'updateUser' })
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  // @Mutation('removeUser')
  // remove(@Args('id') id: number) {
  //   return this.userService.remove(id);
  // }
}

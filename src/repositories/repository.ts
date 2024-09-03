import { Injectable } from '@nestjs/common';
import { RepositoryInterface } from './repository.interface';
import { Prisma } from '@prisma/client';
import {
  PaginatedResult,
  PaginateFunction,
  paginator,
} from '../helpers/paginator.helper';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class Repository<T> implements RepositoryInterface<T> {
  constructor(public model: any) {}

  public async findOne(condition: object) {
    return this.model.findFirst({
      where: condition,
    });
  }

  public async store(data) {
    return this.model.create({
      data: data,
    });
  }

  public async update(where: any, data: any) {
    return this.model.update({
      where: where,
      data: data,
    });
  }

  public async findPagination({
    where,
    orderBy,
    page,
  }: {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    page?: number;
  }): Promise<PaginatedResult<T>> {
    return paginate(
      this.model,
      {
        where,
        orderBy,
      },
      {
        page,
      },
    );
  }

  public async createMany(data: Array<any>) {
    return this.model.createMany({
      data,
    });
  }
}

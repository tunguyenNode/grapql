import { PaginatedResult } from '../helpers/paginator.helper';

export interface RepositoryInterface<T> {
  findOne(condition: object): Promise<T>;

  store(data: any): Promise<T>;

  update(where: object, data: object): Promise<T>;

  findPagination({
    where,
    orderBy,
    page,
  }: {
    where?: object;
    orderBy?: object;
    page?: number;
  }): Promise<PaginatedResult<T>>;
}

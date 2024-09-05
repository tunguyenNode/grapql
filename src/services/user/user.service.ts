import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories';

@Injectable()
export class UserService {
    constructor(private readonly repository: UserRepository) {}

    public async createUser (createUserInput: object) {
        return this.repository.store(createUserInput)
    }
}

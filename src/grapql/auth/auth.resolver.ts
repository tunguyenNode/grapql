import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './responses/auth.response';
import { HttpException, HttpStatus } from '@nestjs/common';
import { SignupResponse } from './responses/signup.response';
import { SignupInput } from './dto/signup.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'login' })
  async login(@Args('authInput') loginInput: LoginInput, @Context() ctx) {
    const user = await this.authService.validateUser(loginInput);
    if (user === false) {
      throw new HttpException(
        'wrong email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.authService.login(user, ctx);
  }

  @Mutation( () => SignupResponse, {name: "signup"})
  async signup(@Args('signupInput') signupInput: SignupInput){
    return this.authService.createUser(signupInput)
  }
}

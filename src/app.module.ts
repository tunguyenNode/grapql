import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as process from 'node:process';
import { join } from 'path';
import { UserModule } from './grapql/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import {
  IsExitsConstraint,
  IsMongoIdObjectConstraint,
  IsUniqueConstraint,
} from './validations';
import { AuthModule } from './grapql/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './repositories/user.repository';
import { DeviceRepository } from './repositories/device.repository';
import { TokenRepository } from './repositories/token.repository';
import { UserService } from './services/user/user.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      context: ({ req, res }) => ({ req, res }),
      formatError: (err) => ({
        ...err,
        extensions: undefined,
        originalError: err?.extensions.originalError,
      }),
    }),
    JwtModule.register({
      secret: 'secretKey', // Replace with your own secret
      signOptions: { expiresIn: '60m' },
      global: true,
    }),
    UserModule,
    PrismaModule,
    ConfigModule.forRoot(),
    AuthModule,
  ],
  controllers: [],
  providers: [
    IsUniqueConstraint,
    IsExitsConstraint,
    IsMongoIdObjectConstraint,
    UserRepository,
    DeviceRepository,
    TokenRepository,
    UserService,
  ],
})
export class AppModule {}

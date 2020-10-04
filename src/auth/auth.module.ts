import { ConfigModule, ConfigService } from '@nestjs/config'
import { Global, Module } from '@nestjs/common'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { GoatStrategy } from '@goatlab/fluent/dist/core/Nestjs/Auth/jwt.strategy'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from './user/user.module'

@Global()
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET', process.env.JWT_SECRET),
        signOptions: {
          expiresIn: 3600,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  // We can include this when we activate GraphQL
  // providers: [AuthService, AuthResolver, GoatStrategy]
  providers: [AuthService, GoatStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

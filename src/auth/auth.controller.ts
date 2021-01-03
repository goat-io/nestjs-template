import { Auth } from '@goatlab/fluent/dist/core/Nestjs/Auth/Auth'
import { getModelSchemaRef } from '@loopback/rest'
import {
  Controller,
  Post,
  Get,
  Body,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common'
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import {
  AuthDtoIn,
  AuthDtoOut,
} from '@goatlab/fluent/dist/core/Nestjs/Auth/auth.dto'
import { Request } from 'express'
import { UsersService } from './user/user.service'
import { UserDtoIn, UserDtoOut } from './user/user.dto'
import { RolesUser } from './roles_users/roles_user.entity'
import { GoatOutput } from '@goatlab/fluent/dist/Providers/types'
import { For } from '@goatlab/fluent/dist/Helpers/For'
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private users: UsersService
  constructor(private readonly authRepository: AuthService) {
    this.users = new UsersService()
  }
  @Get('/me')
  @Auth.protect()
  @ApiResponse({
    status: 200,
    description: 'The created user',
    content: {
      'application/json': { schema: getModelSchemaRef(RolesUser) },
    },
    isArray: false,
    type: UserDtoOut,
  })
  async getUser(
    @Req() request: Request,
  ): Promise<GoatOutput<UserDtoIn, UserDtoOut>> {
    const req = request as any

    const [error, User] = await For.async(
      this.users
        .where(this.users._keys.email, '=', req.user.email)
        .with({ roles: true })
        .get(),
    )

    if (error) {
      console.log('error', error)
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    if (!User[0]) {
      // Create user if it doesn't exist
      const [createError, insertedUser] = await For.async(
        this.users.insert({
          email: req.user.email,
        }),
      )

      if (createError) {
        throw new HttpException(
          createError.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
      }

      return insertedUser
    }

    return User[0]
  }

  @Post('/login')
  @ApiResponse({
    status: 200,
    description: 'Log in the with user credentials',
    content: {
      'application/json': { schema: getModelSchemaRef(AuthDtoOut) },
    },
    type: AuthDtoOut,
  })
  @ApiBody({
    description: 'Credentials',
    type: AuthDtoIn,
  })
  async login(@Body() user: AuthDtoIn): Promise<AuthDtoOut> {
    const dbUser = await this.authRepository.validateUser(user)

    if (!dbUser) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }

    const token = await this.authRepository.login(dbUser)

    return token
  }
}

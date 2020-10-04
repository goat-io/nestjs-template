import { Auth } from '@goatlab/fluent/dist/core/Nestjs/Auth/Auth'
import { getModelSchemaRef } from '@loopback/rest'
import {
  Controller,
  Post,
  Get,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import {
  AuthDtoIn,
  AuthDtoOut,
} from '@goatlab/fluent/dist/core/Nestjs/Auth/auth.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authRepository: AuthService) {}
  @Get('/me')
  @Auth.protect()
  @ApiResponse({
    status: 200,
    description: 'The authenticated user information',
    content: {
      'application/json': {},
    },
    type: String,
  })
  async getUser(): Promise<string> {
    return 'Hello world'
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

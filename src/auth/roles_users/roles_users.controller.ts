import {
  Get,
  Controller,
  Param,
  Post,
  Body,
  Query,
  NotFoundException,
  Delete,
  Put,
  Patch,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger'
import { UserDtoOut, UserDtoIn } from '../user/user.dto'
import { getModelSchemaRef } from '@loopback/rest'
import { GoatOutput } from '@goatlab/fluent/dist/Providers/types'
import { UsersService } from '../user/user.service'
import { RolesUser } from './roles_user.entity'

@ApiTags('Users')
@Controller('/users')
export class RolesUserController {
  private users: UsersService
  constructor() {
    this.users = new UsersService()
  }
  /**
   *
   * @param form
   */
  @Get(':id/roles')
  @ApiResponse({
    status: 200,
    description: 'The created user',
    content: {
      'application/json': { schema: getModelSchemaRef(RolesUser) },
    },
    isArray: false,
    type: UserDtoOut,
  })
  async create(
    @Param('id') id: string,
  ): Promise<GoatOutput<UserDtoIn, UserDtoOut>> {
    const User = await this.users
      .where(this.users._keys.id, '=', id)
      .with({ roles: true })
      .get()

    return User[0]
  }
}

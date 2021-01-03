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
import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger'

import { UserDtoOut, UserDtoIn } from './user.dto'
import { getModelSchemaRef } from '@loopback/rest'
import { User } from './user.entity'
import { GoatFilter, GoatOutput } from '@goatlab/fluent/dist/Providers/types'
import { For } from '@goatlab/fluent/dist/Helpers/For'
import { getGoatFilterSchema } from '@goatlab/fluent/dist/core/dtos/filterSchema'
import { Hash } from '@goatlab/fluent/dist/Helpers/Hash'
import { UsersService } from './user.service'
@ApiTags('Users')
@Controller('users')
export class UserController {
  private users: UsersService
  constructor() {
    this.users = new UsersService()
  }
  /**
   *
   * @param form
   */
  @Post()
  @ApiResponse({
    status: 200,
    description: 'The created user',
    content: {
      'application/json': { schema: getModelSchemaRef(UserDtoOut) },
    },
    isArray: true,
    type: UserDtoOut,
  })
  @ApiBody({
    description: 'User',
    type: UserDtoIn,
  })
  async create(
    @Body() newUserRequest: UserDtoIn,
  ): Promise<GoatOutput<UserDtoIn, UserDtoOut>> {
    let user = newUserRequest

    if (newUserRequest.password) {
      const password = await Hash.hash(newUserRequest.password)
      user = { ...user, password }
    }

    const result = await this.users.insert(user)

    if (!result)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)

    return result
  }
  /**
   *
   */
  @Get()
  @ApiQuery({
    name: 'filter',
    required: false,
    type: 'object',
    schema: getGoatFilterSchema(User),
  })
  @ApiResponse({
    status: 200,
    description: 'The forms found',
    content: {
      'application/json': {
        schema: {
          items: getModelSchemaRef(UserDtoOut),
          type: 'array',
        },
      },
    },
    isArray: true,
    type: UserDtoOut,
  })
  find(
    @Query('filter') filter: GoatFilter,
  ): Promise<GoatOutput<UserDtoIn, UserDtoOut>[]> {
    return this.users.find(filter)
  }
  /**
   *
   * @param filter
   */
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The forms found',
    content: {
      'application/json': {
        schema: {
          items: getModelSchemaRef(UserDtoOut),
          type: 'array',
        },
      },
    },
    isArray: true,
    type: UserDtoOut,
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  async findById(
    @Param('id') id: string,
  ): Promise<GoatOutput<UserDtoIn, UserDtoOut>> {
    const [error, result] = await For.async(this.users.findById(id))

    if (error) {
      throw new NotFoundException(error)
    }

    return result
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The forms found',
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
      },
    },
    isArray: true,
    type: UserDtoOut,
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  async deleteById(@Param('id') id: string): Promise<string> {
    const [error, result] = await For.async(this.users.deleteById(id))

    if (error) {
      throw new NotFoundException(error)
    }

    return result
  }
  /**
   *
   * @param id
   * @param form
   */
  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The created form',
    content: {
      'application/json': { schema: getModelSchemaRef(UserDtoOut) },
    },
    isArray: true,
    type: UserDtoOut,
  })
  @ApiBody({
    description: 'Form',
    type: UserDtoIn,
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  async replaceById(
    @Param('id') id: string,
    @Body() newUserRequest: UserDtoIn,
  ): Promise<GoatOutput<UserDtoIn, UserDtoOut>> {
    let user = newUserRequest

    if (newUserRequest.password) {
      const password = await Hash.hash(newUserRequest.password)
      user = { ...user, password }
    }

    const [error, result] = await For.async(this.users.replaceById(id, user))

    if (error) {
      throw new NotFoundException(error)
    }

    return result
  }
  /**
   *
   * @param id
   * @param form
   */
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The created form',
    content: {
      'application/json': { schema: getModelSchemaRef(UserDtoOut) },
    },
    isArray: true,
    type: UserDtoOut,
  })
  @ApiBody({
    description: 'Form',
    type: UserDtoIn,
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  async updateById(
    @Param('id') id: string,
    @Body() newUserRequest: UserDtoIn,
  ): Promise<GoatOutput<UserDtoIn, UserDtoOut>> {
    let user = newUserRequest

    if (newUserRequest.password && newUserRequest.password !== '') {
      const password = await Hash.hash(newUserRequest.password)

      user = { ...newUserRequest, password }
    }

    const [error, result] = await For.async(this.users.updateById(id, user))

    if (error) {
      throw new NotFoundException(error)
    }

    return result
  }
}

/*
updateWhere
countWhere
*/

import {
  Get,
  Controller,
  Param,
  Post,
  Body,
  Query,
  BadRequestException,
  NotFoundException,
  Delete,
  Put,
  Patch,
  Req,
} from '@nestjs/common'
import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger'
import { OrganizationsService } from './organizations.service'
import { OrganizationDtoOut, OrganizationDtoIn } from './Organizations.dto'
import { getModelSchemaRef } from '@loopback/rest'
import { Organization as OrganizationEntity } from './Organizations.entity'
import { GoatFilter, GoatOutput } from '@goatlab/fluent/dist/Providers/types'
import { For } from '@goatlab/fluent/dist/Helpers/For'
import { getGoatFilterSchema } from '@goatlab/fluent/dist/core/dtos/filterSchema'

import { Auth } from '@goatlab/fluent/dist/core/Nestjs/Auth/Auth'
import { OrganizationGuard } from './organizations.guard'
import { AuthenticatedRequest } from 'auth/authRequest.types'

@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationsController {
  private organization: OrganizationsService
  constructor() {
    this.organization = new OrganizationsService()
  }
  /**
   *
   * @param role
   */
  @Post()
  @Auth.protect(OrganizationGuard)
  @ApiResponse({
    status: 200,
    description: 'The created organization',
    content: {
      'application/json': { schema: getModelSchemaRef(OrganizationDtoOut) },
    },
    isArray: false,
    type: OrganizationDtoOut,
  })
  @ApiBody({
    description: 'Organization',
    type: OrganizationDtoIn,
  })
  async create(
    @Req() request: AuthenticatedRequest,
    @Body() organization: OrganizationDtoIn,
  ): Promise<GoatOutput<OrganizationDtoIn, OrganizationDtoOut>> {
    const [error, createdOrg] = await For.async(
      request.authUserService.createdOrganizations().attach(organization),
    )

    if (error) {
      throw new NotFoundException(error)
    }

    return createdOrg[0]
  }

  @Get()
  @ApiQuery({
    name: 'filter',
    required: false,
    type: 'object',
    schema: getGoatFilterSchema(OrganizationEntity),
  })
  @Auth.protect()
  @ApiResponse({
    status: 200,
    description: 'The roles found',
    content: {
      'application/json': {
        schema: {
          items: getModelSchemaRef(OrganizationDtoOut),
          type: 'array',
        },
      },
    },
    isArray: true,
    type: OrganizationDtoOut,
  })
  find(
    @Query('filter') filter: GoatFilter,
  ): Promise<GoatOutput<OrganizationDtoIn, OrganizationDtoOut>[]> {
    return this.organization.find(filter)
  }
  /**
   *
   * @param filter
   */
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The roles found',
    content: {
      'application/json': {
        schema: {
          items: getModelSchemaRef(OrganizationDtoOut),
          type: 'array',
        },
      },
    },
    isArray: true,
    type: OrganizationDtoOut,
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  async findById(
    @Param('id') id: string,
  ): Promise<GoatOutput<OrganizationDtoIn, OrganizationDtoOut>> {
    const [error, result] = await For.async(this.organization.findById(id))

    if (error) {
      throw new NotFoundException(error)
    }

    return result
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The roles found',
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
      },
    },
    isArray: true,
    type: OrganizationDtoOut,
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  async deleteById(@Param('id') id: string): Promise<string> {
    const [error, result] = await For.async(this.organization.deleteById(id))

    if (error) {
      throw new NotFoundException(error)
    }

    return result
  }
  /**
   *
   * @param id
   * @param role
   */
  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The created role',
    content: {
      'application/json': { schema: getModelSchemaRef(OrganizationDtoOut) },
    },
    isArray: true,
    type: OrganizationDtoOut,
  })
  @ApiBody({
    description: 'Role',
    type: OrganizationDtoIn,
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  async replaceById(
    @Param('id') id: string,
    @Body() role: OrganizationDtoIn,
  ): Promise<GoatOutput<OrganizationDtoIn, OrganizationDtoOut>> {
    const [error, result] = await For.async(
      this.organization.replaceById(id, role),
    )

    if (error) {
      throw new NotFoundException(error)
    }

    return result
  }
  /**
   *
   * @param id
   * @param role
   */
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The created role',
    content: {
      'application/json': { schema: getModelSchemaRef(OrganizationDtoOut) },
    },
    isArray: true,
    type: OrganizationDtoOut,
  })
  @ApiBody({
    description: 'Role',
    type: OrganizationDtoIn,
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  async updateById(
    @Param('id') id: string,
    @Body() role: OrganizationDtoIn,
  ): Promise<GoatOutput<OrganizationDtoIn, OrganizationDtoOut>> {
    const [error, result] = await For.async(
      this.organization.replaceById(id, role),
    )

    if (error) {
      throw new NotFoundException(error)
    }

    return result
  }
}

/*
replaceById
updateWhere
countWhere
*/

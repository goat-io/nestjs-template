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
  Patch
} from '@nestjs/common'
import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiParam
} from '@nestjs/swagger'
import { kitchensinkService } from '../kitchensink.service'
import { kitchensinkDtoOut, kitchensinkDtoIn} from '../kitchensink.dto'
import { getModelSchemaRef, SchemaObject } from '@loopback/rest'
import { kitchensinkEntity } from '../kitchensink.entity'
import to from 'await-to-js'
import { GoatFilter, GoatOutput } from '@goatlab/fluent/dist/Providers/types'
import { For } from '@goatlab/fluent/dist/Helpers/For'
import { getGoatFilterSchema } from '@goatlab/fluent/dist/core/dtos/filterSchema'


@ApiTags('kitchensink')
@Controller('kitchensink')
export class kitchensinkBaseController {
  private kitchensink: kitchensinkService['model']
  constructor(private readonly kitchensinkRepository: kitchensinkService) {
    this.kitchensink = this.kitchensinkRepository.model
  }

    /**
   *
   * @param form
   */
  @Post()
  @ApiResponse({
    status: 200,
    description: 'The created kitchensink',
    content: {
      'application/json': { schema: getModelSchemaRef(kitchensinkDtoOut) }
    },
    isArray: true,
    type: kitchensinkDtoOut
  })
  @ApiBody({
    description: 'kitchensink',
    type: kitchensinkDtoIn
  })
  async create(
    @Body() kitchensink: kitchensinkDtoIn
  ): Promise<GoatOutput<kitchensinkDtoIn, kitchensinkDtoOut>> {
    const [error, response] = await to(this.kitchensink.insert(kitchensink))

    if (error) {
      throw new BadRequestException(error)
    }

    return response
  }
  /**
   *
   * @param form
   */
  @Post('/createMany')
  @ApiResponse({
    status: 200,
    description: 'The created kitchensink',
    content: {
      'application/json': {
        schema: {
          items: getModelSchemaRef(kitchensinkDtoOut),
          type: 'array'
        }
      }
    },
    isArray: true,
    type: kitchensinkDtoOut
  })
  @ApiBody({
    description: 'Form',
    type: kitchensinkDtoIn
  })
  createMany(
    @Body() kitchensink: kitchensinkDtoIn[]
  ): Promise<GoatOutput<kitchensinkDtoIn, kitchensinkDtoOut>[]> {
    return this.kitchensink.insertMany(kitchensink)
  }
  /**
   *
   */
  @Get()
  @ApiQuery({
    name: 'filter',
    required: false,
    type: 'object',
    schema: getGoatFilterSchema(kitchensinkEntity)
  })
  @ApiResponse({
    status: 200,
    description: 'The kitchensink found',
    content: {
      'application/json': {
        schema: {
          items: getModelSchemaRef(kitchensinkDtoOut),
          type: 'array'
        }
      }
    },
    isArray: true,
    type: kitchensinkDtoOut
  })
  find(
    @Query('filter') filter: GoatFilter
  ): Promise<GoatOutput<kitchensinkDtoIn, kitchensinkDtoOut>[]> {
    return this.kitchensink.find(filter)
  }

  /**
   *
   */
  /*
  @Get('/paginated')
  @ApiQuery({
    type: 'object',
    required: false,
    name: 'filter',
    schema: getFilterSchemaFor(kitchensinkEntity)
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: 'number'
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number'
  })
  @ApiResponse({
    status: 200,
    description: 'The forms found',
    content: {
      'application/json': {
        schema: {
          items: getModelSchemaRef(kitchensinkDtoPaginated)
        }
      }
    },
    type: kitchensinkDtoPaginated
  })
  findPaginated(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter?: Filter<kitchensinkDtoOut>
  ): Promise<kitchensinkDtoPaginated> {
    limit = limit > 100 ? 100 : limit
    return this.kitchensink.paginate({
      page,
      limit
    })
  }
  */
  /**
   *
   * @param filter
   */
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The kitchensink found',
    content: {
      'application/json': {
        schema: {
          items: getModelSchemaRef(kitchensinkDtoOut),
          type: 'array'
        }
      }
    },
    isArray: true,
    type: kitchensinkDtoOut
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string'
  })
  async findById(
    @Param('id') id: string
  ): Promise<GoatOutput<kitchensinkDtoIn, kitchensinkDtoOut>> {
    const [error, result] = await For.async(this.kitchensink.findById(id))

    if (error) {
      throw new NotFoundException(error)
    }

    return result
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The kitchensink found',
    content: {
      'application/json': {
        schema: {
          type: 'string'
        }
      }
    },
    isArray: true,
    type: kitchensinkDtoOut
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string'
  })
  async deleteById(@Param('id') id: string): Promise<string> {
    const [error, result] = await For.async(this.kitchensink.deleteById(id))

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
    description: 'The created kitchensink',
    content: {
      'application/json': { schema: getModelSchemaRef(kitchensinkDtoOut) }
    },
    isArray: true,
    type: kitchensinkDtoOut
  })
  @ApiBody({
    description: 'kitchensink',
    type: kitchensinkDtoIn
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string'
  })
  async replaceById(
    @Param('id') id: string,
    @Body() form: kitchensinkDtoIn
  ): Promise<GoatOutput<kitchensinkDtoIn, kitchensinkDtoOut>> {
    const [error, result] = await For.async(this.kitchensink.replaceById(id, form))

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
    description: 'The created kitchensink',
    content: {
      'application/json': { schema: getModelSchemaRef(kitchensinkDtoOut) }
    },
    isArray: true,
    type: kitchensinkDtoOut
  })
  @ApiBody({
    description: 'kitchensink',
    type: kitchensinkDtoIn
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string'
  })
  async updateById(
    @Param('id') id: string,
    @Body() form: kitchensinkDtoIn
  ): Promise<GoatOutput<kitchensinkDtoIn, kitchensinkDtoOut>> {
    const [error, result] = await For.async(this.kitchensink.updateById(id, form))

    if (error) {
      throw new NotFoundException(error)
    }

    return result
  }
  
}
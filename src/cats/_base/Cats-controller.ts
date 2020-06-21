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
import { CatsService } from '../Cats.service'
import { CatsDtoOut, CatsDtoIn} from '../Cats.dto'
import { getModelSchemaRef, SchemaObject } from '@loopback/rest'
import { CatsEntity } from '../Cats.entity'
import to from 'await-to-js'
import { GoatFilter, GoatOutput } from '@goatlab/fluent/dist/Providers/types'
import { For } from '@goatlab/fluent/dist/Helpers/For'
import { getGoatFilterSchema } from '@goatlab/fluent/dist/core/dtos/filterSchema'


@ApiTags('Cats')
@Controller('Cats')
export class CatsBaseController {
  private Cats: CatsService['model']
  constructor(private readonly CatsRepository: CatsService) {
    this.Cats = this.CatsRepository.model
  }

    /**
   *
   * @param form
   */
  @Post()
  @ApiResponse({
    status: 200,
    description: 'The created Cats',
    content: {
      'application/json': { schema: getModelSchemaRef(CatsDtoOut) }
    },
    isArray: true,
    type: CatsDtoOut
  })
  @ApiBody({
    description: 'Cats',
    type: CatsDtoIn
  })
  async create(
    @Body() Cats: CatsDtoIn
  ): Promise<GoatOutput<CatsDtoIn, CatsDtoOut>> {
    const [error, response] = await to(this.Cats.insert(Cats))

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
    description: 'The created Cats',
    content: {
      'application/json': {
        schema: {
          items: getModelSchemaRef(CatsDtoOut),
          type: 'array'
        }
      }
    },
    isArray: true,
    type: CatsDtoOut
  })
  @ApiBody({
    description: 'Form',
    type: CatsDtoIn
  })
  createMany(
    @Body() Cats: CatsDtoIn[]
  ): Promise<GoatOutput<CatsDtoIn, CatsDtoOut>[]> {
    return this.Cats.insertMany(Cats)
  }
  /**
   *
   */
  @Get()
  @ApiQuery({
    name: 'filter',
    required: false,
    type: 'object',
    schema: getGoatFilterSchema(CatsEntity)
  })
  @ApiResponse({
    status: 200,
    description: 'The Cats found',
    content: {
      'application/json': {
        schema: {
          items: getModelSchemaRef(CatsDtoOut),
          type: 'array'
        }
      }
    },
    isArray: true,
    type: CatsDtoOut
  })
  find(
    @Query('filter') filter: GoatFilter
  ): Promise<GoatOutput<CatsDtoIn, CatsDtoOut>[]> {
    return this.Cats.find(filter)
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
    schema: getFilterSchemaFor(CatsEntity)
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
          items: getModelSchemaRef(CatsDtoPaginated)
        }
      }
    },
    type: CatsDtoPaginated
  })
  findPaginated(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter?: Filter<CatsDtoOut>
  ): Promise<CatsDtoPaginated> {
    limit = limit > 100 ? 100 : limit
    return this.Cats.paginate({
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
    description: 'The Cats found',
    content: {
      'application/json': {
        schema: {
          items: getModelSchemaRef(CatsDtoOut),
          type: 'array'
        }
      }
    },
    isArray: true,
    type: CatsDtoOut
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string'
  })
  async findById(
    @Param('id') id: string
  ): Promise<GoatOutput<CatsDtoIn, CatsDtoOut>> {
    const [error, result] = await For.async(this.Cats.findById(id))

    if (error) {
      throw new NotFoundException(error)
    }

    return result
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The Cats found',
    content: {
      'application/json': {
        schema: {
          type: 'string'
        }
      }
    },
    isArray: true,
    type: CatsDtoOut
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string'
  })
  async deleteById(@Param('id') id: string): Promise<string> {
    const [error, result] = await For.async(this.Cats.deleteById(id))

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
    description: 'The created Cats',
    content: {
      'application/json': { schema: getModelSchemaRef(CatsDtoOut) }
    },
    isArray: true,
    type: CatsDtoOut
  })
  @ApiBody({
    description: 'Cats',
    type: CatsDtoIn
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string'
  })
  async replaceById(
    @Param('id') id: string,
    @Body() form: CatsDtoIn
  ): Promise<GoatOutput<CatsDtoIn, CatsDtoOut>> {
    const [error, result] = await For.async(this.Cats.replaceById(id, form))

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
    description: 'The created Cats',
    content: {
      'application/json': { schema: getModelSchemaRef(CatsDtoOut) }
    },
    isArray: true,
    type: CatsDtoOut
  })
  @ApiBody({
    description: 'Cats',
    type: CatsDtoIn
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string'
  })
  async updateById(
    @Param('id') id: string,
    @Body() form: CatsDtoIn
  ): Promise<GoatOutput<CatsDtoIn, CatsDtoOut>> {
    const [error, result] = await For.async(this.Cats.updateById(id, form))

    if (error) {
      throw new NotFoundException(error)
    }

    return result
  }
  
}
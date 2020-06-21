import { Injectable, Inject } from '@nestjs/common'
import { kitchensinkEntity } from "../kitchensink.entity";
import { kitchensinkDtoIn, kitchensinkDtoOut} from '../kitchensink.dto'
import {
  TypeOrmConnector,
  GoatRepository
} from '@goatlab/fluent/dist/Providers/TypeOrm/TypeOrmConnector'

@Injectable()
export class kitchensinkServiceBase {
  public model: TypeOrmConnector<kitchensinkEntity, kitchensinkDtoIn, kitchensinkDtoOut>
  constructor(
    @Inject('kitchensink_REPOSITORY')
    private kitchensink: GoatRepository<kitchensinkEntity>
  ) {
    this.model = new TypeOrmConnector<kitchensinkEntity, kitchensinkDtoIn, kitchensinkDtoOut>({
      repository: this.kitchensink
    })
  }
}
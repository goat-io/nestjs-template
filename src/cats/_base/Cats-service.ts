import { Injectable, Inject } from '@nestjs/common'
import { CatsEntity } from "../Cats.entity";
import { CatsDtoIn, CatsDtoOut} from '../Cats.dto'
import {
  TypeOrmConnector,
  GoatRepository
} from '@goatlab/fluent/dist/Providers/TypeOrm/TypeOrmConnector'

@Injectable()
export class CatsServiceBase {
  public model: TypeOrmConnector<CatsEntity, CatsDtoIn, CatsDtoOut>
  constructor(
    @Inject('Cats_REPOSITORY')
    private Cats: GoatRepository<CatsEntity>
  ) {
    this.model = new TypeOrmConnector<CatsEntity, CatsDtoIn, CatsDtoOut>({
      repository: this.Cats
    })
  }
}
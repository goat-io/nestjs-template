import { OmitType, PartialType, ApiProperty } from '@nestjs/swagger'
import { CatsEntity, CatsEntityFaker } from "./Cats.entity";
import { InputType } from '@nestjs/graphql'
import { Column, Repository } from 'typeorm'
import { IPaginationMeta, IPaginationLinks } from '@goatlab/fluent/dist/core/dtos/pagination.dto'

@InputType()
export class CatsDtoOut extends OmitType(CatsEntity, [
  'deleted',
  'access',
  'submissionAccess',
  'version',
  '_ngram',
  'form'
] as const) {}
/**
 *
 */
// tslint:disable-next-line: max-classes-per-file
@InputType()
export class CatsDtoIn extends OmitType(CatsEntity , [
  'id',
  'created',
  'updated',
  'deleted',
  'access',
  'submissionAccess',
  'version',
  'owner',
  'roles',
  '_ngram',
  'form'
] as const) {}
/**
 *
 */
// tslint:disable-next-line: max-classes-per-file
@InputType()
export class CatsDtoPatch extends PartialType(CatsDtoIn) {}
/**
 *
 */
// tslint:disable-next-line: max-classes-per-file
@InputType()
export class CatsDtoPaginated {
  @Column(type => CatsDtoOut)
  @ApiProperty({ isArray: true, type: CatsDtoOut })
  items: CatsDtoOut[]

  @Column(type => IPaginationMeta)
  @ApiProperty({ type: IPaginationMeta })
  meta: IPaginationMeta

  @Column(type => IPaginationLinks)
  @ApiProperty({ type: IPaginationLinks })
  links: IPaginationLinks
}

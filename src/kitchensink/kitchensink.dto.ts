import { OmitType, PartialType, ApiProperty } from '@nestjs/swagger'
import { kitchensinkEntity, kitchensinkEntityFaker } from "./kitchensink.entity";
import { InputType } from '@nestjs/graphql'
import { Column, Repository } from 'typeorm'
import { IPaginationMeta, IPaginationLinks } from '@goatlab/fluent/dist/core/dtos/pagination.dto'

@InputType()
export class kitchensinkDtoOut extends OmitType(kitchensinkEntity, [
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
export class kitchensinkDtoIn extends OmitType(kitchensinkEntity , [
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
export class kitchensinkDtoPatch extends PartialType(kitchensinkDtoIn) {}
/**
 *
 */
// tslint:disable-next-line: max-classes-per-file
@InputType()
export class kitchensinkDtoPaginated {
  @Column(type => kitchensinkDtoOut)
  @ApiProperty({ isArray: true, type: kitchensinkDtoOut })
  items: kitchensinkDtoOut[]

  @Column(type => IPaginationMeta)
  @ApiProperty({ type: IPaginationMeta })
  meta: IPaginationMeta

  @Column(type => IPaginationLinks)
  @ApiProperty({ type: IPaginationLinks })
  links: IPaginationLinks
}

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import {
  IPaginationLinks,
  IPaginationMeta,
} from '@goatlab/fluent/dist/core/dtos/pagination.dto'

import { Column } from 'typeorm'
import { InputType } from '@nestjs/graphql'
import { Organization } from './organizations.entity'

/**
 *
 */
@InputType()
export class OrganizationDtoOut extends OmitType(Organization, [
  'deleted',
  'owner',
] as const) {}
/**
 *
 */
// tslint:disable-next-line: max-classes-per-file
@InputType()
export class OrganizationDtoIn extends OmitType(Organization, [
  'id',
  'created',
  'updated',
  'deleted',
  'owner',
] as const) {}
/**
 *
 */
// tslint:disable-next-line: max-classes-per-file
@InputType()
export class OrganizationDtoPatch extends PartialType(OrganizationDtoIn) {}
/**
 *
 */
// tslint:disable-next-line: max-classes-per-file
@InputType()
export class OrganizationDtoPaginated {
  @Column(type => OrganizationDtoOut)
  @ApiProperty({ isArray: true, type: OrganizationDtoOut })
  items: OrganizationDtoOut[]

  @Column(type => IPaginationMeta)
  @ApiProperty({ type: IPaginationMeta })
  meta: IPaginationMeta

  @Column(type => IPaginationLinks)
  @ApiProperty({ type: IPaginationLinks })
  links: IPaginationLinks
}

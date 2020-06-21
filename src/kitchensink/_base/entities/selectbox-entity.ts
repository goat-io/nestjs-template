import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  ObjectIdColumn
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import * as faker from 'faker'
import {Access} from "@goatlab/fluent/dist/core/dtos/access.dto"


@ObjectType()
export class selectboxBaseEntity {
  
  
  
  @Column({
    nullable: true,
    type: "boolean"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "coffee"?: boolean;
  
  @Column({
    nullable: true,
    type: "boolean"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "chocolate"?: boolean;
  
  @Column({
    nullable: true,
    type: "boolean"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "ice-cream"?: boolean;
  

}

export const selectboxBaseEntityFaker = (): selectboxBaseEntity => {
  const fakeElement: selectboxBaseEntity = {
    
    
    "coffee": faker.random.boolean(),
    "chocolate": faker.random.boolean(),
    "ice-cream": faker.random.boolean(),
    
  }

  return fakeElement
}

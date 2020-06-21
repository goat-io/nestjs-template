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
export class carsBaseEntity {
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "make"?: string;
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "model"?: string;
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "year"?: string;
  

}

export const carsBaseEntityFaker = (): carsBaseEntity[] => {
  const fakeElement: carsBaseEntity = {
    "make": faker.random.word().split(" ")[0],
    "model": faker.random.word().split(" ")[0],
    "year": faker.random.word().split(" ")[0],
    
  }

  return [fakeElement, fakeElement,fakeElement] 
}

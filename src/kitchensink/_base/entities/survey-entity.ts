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
export class surveyBaseEntity {
  
  
  
  @Column({
    nullable: true,
    type: "string", 
    enum: [ "AnsValue","AnsValue1","AnsValue2","AnsValue3", ]
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "QueValue"?: string;
  
  @Column({
    nullable: true,
    type: "string", 
    enum: [ "AnsValue","AnsValue1","AnsValue2","AnsValue3", ]
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "QueValue1"?: string;
  
  @Column({
    nullable: true,
    type: "string", 
    enum: [ "AnsValue","AnsValue1","AnsValue2","AnsValue3", ]
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "QueValue2"?: string;
  

}

export const surveyBaseEntityFaker = (): surveyBaseEntity => {
  const fakeElement: surveyBaseEntity = {
    
    
    "QueValue": faker.random.word().split(" ")[0],
    "QueValue1": faker.random.word().split(" ")[0],
    "QueValue2": faker.random.word().split(" ")[0],
    
  }

  return fakeElement
}

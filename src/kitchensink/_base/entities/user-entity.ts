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
export class userBaseEntity {
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "firstName"?: string;
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "email"?: string;
  
  @Column({
    nullable: true,
    type: "boolean"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "havePhoneNumber"?: boolean;
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "phoneNumber"?: string;
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "lastName"?: string;
  
  @Column({
    nullable: true,
    type: "number"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "number"?: number;
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "password"?: string;
  
  @Column({ type: 'simple-array', nullable: true, })
  @ApiProperty({ type: [String], nullable: true, required: false })
  "kids"?: string[];
  

}

export const userBaseEntityFaker = (): userBaseEntity => {
  const fakeElement: userBaseEntity = {
    "firstName": faker.random.word().split(" ")[0],
    "email": faker.random.word().split(" ")[0],
    "havePhoneNumber": faker.random.boolean(),
    "phoneNumber": faker.random.word().split(" ")[0],
    "lastName": faker.random.word().split(" ")[0],
    "number": faker.random.number(),
    "password": faker.random.word().split(" ")[0],
    "kids": [faker.random.word().split(" ")[0], faker.random.word().split(" ")[0], faker.random.word().split(" ")[0]],
    
  }

  return fakeElement
}

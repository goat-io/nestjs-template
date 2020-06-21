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


@Entity()
@ObjectType()
export class CatsBaseEntity {
  // @PrimaryGeneratedColumn('uuid')
  @ObjectIdColumn()
  @ApiProperty()
  @Field(() => ID)
  id: string
  
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "owner"?: string;
  
  @Column({ type: 'simple-array', nullable: true, })
  @ApiProperty({ type: [String], nullable: true, required: false })
  "roles"?: string[];
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "_ngram"?: string;
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "form"?: string;
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "name"?: string;
  
  @Column({
    nullable: true,
    type: "number"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "age"?: number;
  

  @CreateDateColumn()
  @ApiProperty()
  created: Date

  @UpdateDateColumn()
  @ApiProperty()
  updated: Date

  @DeleteDateColumn()
  @ApiProperty()
  deleted: Date

  @VersionColumn()
  @ApiProperty()
  version: number

  @Column(type => Access)
  @ApiProperty({ isArray: true, type: Access, nullable: true, required: false })
  access?: Access[]

  @Column(type => Access)
  @ApiProperty({ isArray: true, type: Access, nullable: true, required: false })
  submissionAccess?: Access[]
}

export const CatsBaseEntityFaker = (): CatsBaseEntity => {
  const fakeElement: CatsBaseEntity = {
    created: faker.date.recent(),
    updated: faker.date.recent(),
    deleted: faker.date.recent(),
    version: faker.random.number(),
    access: [
      {
        type: faker.random.word(),
        roles: [faker.random.uuid(), faker.random.uuid()]
      }
    ],
    submissionAccess: [
      {
        type: faker.random.word(),
        roles: [faker.random.uuid(), faker.random.uuid()]
      }
    ],
    id: faker.random.uuid(),
    
    "owner": faker.random.word().split(" ")[0],
    "roles": [faker.random.word().split(" ")[0], faker.random.word().split(" ")[0], faker.random.word().split(" ")[0]],
    "_ngram": faker.random.word().split(" ")[0],
    "form": faker.random.word().split(" ")[0],
    "name": faker.random.word().split(" ")[0],
    "age": faker.random.number(),
    
  }

  return fakeElement
}

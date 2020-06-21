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
import { userBaseEntity, userBaseEntityFaker } from "./user-entity";
import { carsBaseEntity, carsBaseEntityFaker } from "./cars-entity";
import { selectboxBaseEntity, selectboxBaseEntityFaker } from "./selectbox-entity";
import { surveyBaseEntity, surveyBaseEntityFaker } from "./survey-entity";


@Entity()
@ObjectType()
export class kitchensinkBaseEntity {
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
  
  @Column(type => userBaseEntity)
  @ApiProperty({ type: userBaseEntity, nullable: true , required: false })
  "user"?:userBaseEntity;
  
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "day"?: string;
  
  @Column(type =>  carsBaseEntity)
  @ApiProperty({ isArray: true, type: carsBaseEntity, nullable: true , required: false })
  "cars"?: carsBaseEntity[];
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "mycontent"?: string;
  
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
  "lastName"?: string;
  
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
  "checkbox"?: boolean;
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "textarea1"?: string;
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "text"?: string;
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "textarea2"?: string;
  
  @Column({
    nullable: true,
    type: "string", 
    enum: [ "val1","val2","val3", ]
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "radio"?: string;
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "currency"?: string;
  
  @Column({
    nullable: true,
    type: "boolean"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "checkbox2"?: boolean;
  
  @Column(type => selectboxBaseEntity)
  @ApiProperty({ type: selectboxBaseEntity, nullable: true , required: false })
  "selectbox"?:selectboxBaseEntity;
  
  
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
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "textarea3"?: string;
  
  @Column(type => surveyBaseEntity)
  @ApiProperty({ type: surveyBaseEntity, nullable: true , required: false })
  "survey"?:surveyBaseEntity;
  
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "dateTime"?: string;
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "pname"?: string;
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "fruits"?: string;
  
  @Column({
    nullable: false,
    type: "string"
  })
  @ApiProperty({
    nullable: false, 
    required: true
  })
  "address": string;
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "resource"?: string;
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "signature"?: string;
  
  @Column({
    nullable: true,
    type: "string"
  })
  @ApiProperty({
    nullable: true, 
    required: false
  })
  "nameHidden"?: string;
  

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

export const kitchensinkBaseEntityFaker = (): kitchensinkBaseEntity => {
  const fakeElement: kitchensinkBaseEntity = {
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
    "user":userBaseEntityFaker(),
    
    "day": faker.random.word().split(" ")[0],
    "cars": carsBaseEntityFaker(),
    "mycontent": faker.random.word().split(" ")[0],
    "firstName": faker.random.word().split(" ")[0],
    "lastName": faker.random.word().split(" ")[0],
    "email": faker.random.word().split(" ")[0],
    "checkbox": faker.random.boolean(),
    "textarea1": faker.random.word().split(" ")[0],
    "text": faker.random.word().split(" ")[0],
    "textarea2": faker.random.word().split(" ")[0],
    "radio": faker.random.word().split(" ")[0],
    "currency": faker.random.word().split(" ")[0],
    "checkbox2": faker.random.boolean(),
    "selectbox":selectboxBaseEntityFaker(),
    
    "name": faker.random.word().split(" ")[0],
    "textarea3": faker.random.word().split(" ")[0],
    "survey":surveyBaseEntityFaker(),
    
    "dateTime": faker.random.word().split(" ")[0],
    "pname": faker.random.word().split(" ")[0],
    "fruits": faker.random.word().split(" ")[0],
    "address": faker.random.word().split(" ")[0],
    "resource": faker.random.word().split(" ")[0],
    "signature": faker.random.word().split(" ")[0],
    "nameHidden": faker.random.word().split(" ")[0],
    
  }

  return fakeElement
}

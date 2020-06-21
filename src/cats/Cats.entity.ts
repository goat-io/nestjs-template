import { CatsBaseEntity, CatsBaseEntityFaker } from "./_base/entities/Cats-entity";
import {
  Entity,
} from 'typeorm'

@Entity()
export class CatsEntity extends CatsBaseEntity {}


export const CatsEntityFaker = (): CatsEntity => {
  const fakeBaseElement: CatsBaseEntity = CatsBaseEntityFaker()

  const fakeElement = {}

  return {...fakeBaseElement,...fakeElement} as CatsEntity
}

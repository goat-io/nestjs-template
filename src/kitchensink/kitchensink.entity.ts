import { kitchensinkBaseEntity, kitchensinkBaseEntityFaker } from "./_base/entities/kitchensink-entity";
import {
  Entity,
} from 'typeorm'

@Entity()
export class kitchensinkEntity extends kitchensinkBaseEntity {}


export const kitchensinkEntityFaker = (): kitchensinkEntity => {
  const fakeBaseElement: kitchensinkBaseEntity = kitchensinkBaseEntityFaker()

  const fakeElement = {}

  return {...fakeBaseElement,...fakeElement} as kitchensinkEntity
}

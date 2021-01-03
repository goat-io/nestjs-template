import * as faker from 'faker'

import { Decorators } from '@goatlab/fluent/dist/core/Nestjs/Database/decorators'
import { User } from 'auth/user/user.entity'

@Decorators.entity('organizations')
export class Organization {
  @Decorators.id()
  id: string

  @Decorators.property({ required: false })
  description?: string

  @Decorators.property({ required: true, unique: true })
  name: string

  @Decorators.property({ required: false, unique: false })
  logo: string

  @Decorators.belongsTo<User>({
    entity: () => User,
    inverse: user => user.id,
    pivotColumnName: 'owner',
  })
  owner?: User

  @Decorators.created()
  created: Date

  @Decorators.updated()
  updated: Date

  @Decorators.deleted()
  deleted: Date
}

export const fakeOrganization = (): Organization => {
  return {
    id: faker.random.uuid(),
    description: faker.name.firstName(),
    name: faker.company.name(),
    logo: faker.image.imageUrl(),
    created: faker.date.recent(),
    updated: faker.date.recent(),
    deleted: faker.date.recent(),
  }
}

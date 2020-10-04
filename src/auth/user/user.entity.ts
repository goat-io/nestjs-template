import { Decorators } from '@goatlab/fluent/dist/core/Nestjs/Database/decorators'

@Decorators.entity('User')
export class User {
  @Decorators.id()
  id: string

  @Decorators.property({ required: true, unique: true })
  email: string

  @Decorators.property({ required: false, hidden: true })
  password?: string

  @Decorators.property({ required: false })
  firstName?: string

  @Decorators.property({ required: false })
  lastName?: string

  @Decorators.created()
  created: Date

  @Decorators.updated()
  updated: Date

  @Decorators.deleted()
  deleted: Date

  @Decorators.version()
  version: number
}

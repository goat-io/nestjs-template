import { Decorators } from '@goatlab/fluent/dist/core/Nestjs/Database/decorators'
import { Organization } from 'organizations/organizations.entity'
import { Role } from '../roles/roles.entity'

@Decorators.entity('users')
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

  @Decorators.property({ required: false })
  language?: string

  @Decorators.property({ required: false })
  country?: string

  @Decorators.property({ required: false })
  type?: string

  @Decorators.created()
  created: Date

  @Decorators.updated()
  updated: Date

  @Decorators.deleted()
  deleted: Date

  @Decorators.version()
  version: number

  @Decorators.belongsToMany<Role>({
    entity: () => Role,
    joinTableName: 'roles_users',
    foreignKey: 'userId',
    inverseForeignKey: 'roleId',
  })
  roles?: Role[]

  @Decorators.hasMany({
    entity: () => Organization,
    inverse: organization => organization.owner,
  })
  organizations?: Organization[]
}

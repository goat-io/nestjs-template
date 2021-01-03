import { RoleDtoIn, RoleDtoOut } from './roles.dto'

import { Role } from './roles.entity'
import { TypeOrmConnector } from '@goatlab/fluent/dist/Providers/TypeOrm/TypeOrmConnector'

export class RoleService extends TypeOrmConnector<Role, RoleDtoIn, RoleDtoOut> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(relations?: any) {
    super(Role, relations, 'LOCAL_DB')
  }
}

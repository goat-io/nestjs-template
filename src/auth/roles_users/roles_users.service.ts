import { FirebaseConnector } from '@goatlab/fluent/dist/Providers/Firebase/FirebaseConnector'
import { RoleUserEntityIn } from './role_user.dto'
import { RolesUser } from './roles_user.entity'

export class RoleUsersService extends FirebaseConnector<
  RolesUser,
  RoleUserEntityIn
> {
  constructor(relations?: any) {
    super(RolesUser, relations)
  }
}

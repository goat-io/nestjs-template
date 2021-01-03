/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UserDtoIn, UserDtoOut } from './user.dto'

import { FirebaseConnector } from '@goatlab/fluent/dist/Providers/Firebase/FirebaseConnector'
import { GoatOutput } from '@goatlab/fluent/dist/Providers/types'
import { Hash } from '@goatlab/fluent/dist/Helpers/Hash'
import { OrganizationsService } from 'organizations/organizations.service'
import { RoleService } from '../roles/roles.service'
import { RoleUsersService } from '../roles_users/roles_users.service'
import { User } from './user.entity'

export class UsersService extends FirebaseConnector<
  User,
  UserDtoIn,
  UserDtoOut
> {
  constructor(relations?: any) {
    super(User, relations)
  }
  /**
   *
   * @param input
   */
  async validate(
    input: UserDtoIn,
  ): Promise<GoatOutput<UserDtoIn, UserDtoOut> | null> {
    const { email, password } = input
    const user = await this.forceSelect(this._keys.password)
      .where(this._keys.email, '=', email)
      .first()

    if (!user) return null

    const valid = await Hash.compare(password, user.password)
    delete user.password
    return valid ? user : null
  }
  /**
   *
   * @param email
   */
  async findByEmail(email: string): Promise<GoatOutput<UserDtoIn, UserDtoOut>> {
    return this.where(this._keys.email, '=', email).first()
  }
  /**
   *
   */
  public roles = () => {
    return this.belongsToMany<RoleService, RoleUsersService>(
      RoleService,
      RoleUsersService,
      'roles',
    )
  }

  public createdOrganizations = () => {
    return this.hasMany<OrganizationsService>(
      OrganizationsService,
      'organizations',
    )
  }
}

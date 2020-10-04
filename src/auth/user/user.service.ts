import { Hash } from '@goatlab/fluent/dist/Helpers/Hash'
import { Injectable, Inject } from '@nestjs/common'
import { IRepository } from '@goatlab/fluent/dist/core/Nestjs/Database/createRepository'
import { UserDtoOut, UserDtoIn } from './user.dto'
import { User } from './user.entity'
import { TypeOrmConnector } from '@goatlab/fluent/dist/Providers/TypeOrm/TypeOrmConnector'
import { FirebaseConnector } from '@goatlab/fluent/dist/Providers/Firebase/FirebaseConnector'
import { GoatOutput } from '@goatlab/fluent/dist/Providers/types'

@Injectable()
export class UsersService {
  public model:
    | FirebaseConnector<User, UserDtoIn, UserDtoOut>
    | TypeOrmConnector<User, UserDtoIn, UserDtoOut>

  constructor(
    @Inject('USER_REPOSITORY')
    private repositoryConnector: IRepository<User> | any,
  ) {
    if (repositoryConnector.type === 'firebase') {
      this.model = new FirebaseConnector<User, UserDtoIn, UserDtoOut>(User)
      return
    }

    this.model = new TypeOrmConnector<User, UserDtoIn, UserDtoOut>(User)
  }

  async validate(
    input: UserDtoIn,
  ): Promise<GoatOutput<UserDtoIn, UserDtoOut> | null> {
    const { email, password } = input
    const user = await this.model
      .forceSelect(this.model._keys.password)
      .where(this.model._keys.email, '=', email)
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
    return this.model.where(this.model._keys.email, '=', email).first()
  }
}

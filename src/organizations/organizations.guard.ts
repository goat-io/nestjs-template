import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'

import { Auth } from '@goatlab/fluent/dist/core/Nestjs/Auth/Auth'
import { For } from '@goatlab/fluent/dist/Helpers/For'
import { UsersService } from 'auth/user/user.service'

@Injectable()
export class OrganizationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const users = new UsersService()
    const { user } = Auth.parseContext(context)
    const req = context.switchToHttp().getRequest()

    const [error, User] = await For.async(
      users
        .where(users._keys.email, '=', user.email)
        .with({ roles: true })
        .load(),
    )

    if (error) {
      console.log('error', error)
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    if (User) {
      req.authUserService = User
      return true
    }
  }
}

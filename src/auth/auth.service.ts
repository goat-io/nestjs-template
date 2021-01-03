import { UserDtoIn, UserDtoOut } from './user/user.dto'

import { AuthDtoOut } from '@goatlab/fluent/dist/core/Nestjs/Auth/auth.dto'
import { GoatOutput } from '@goatlab/fluent/dist/Providers/types'
import { Injectable } from '@nestjs/common'
import { Jwt } from '@goatlab/fluent/dist/Helpers/Jwt'
import { UsersService } from './user/user.service'

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UsersService) {
    this.userRepository = new UsersService()
  }

  async login(user: GoatOutput<UserDtoIn, UserDtoOut>): Promise<AuthDtoOut> {
    const payload = {
      sub: user.id,
      user,
    }
    const token = await Jwt.generate(payload, {
      secret: process.env.AUTH_JWT_SECRET,
      expiresIn: process.env.AUTH_JWT_DURATION,
    })
    return {
      token,
    }
  }

  async validateUser(
    UserInput: UserDtoIn,
  ): Promise<GoatOutput<UserDtoIn, UserDtoOut> | null> {
    return await this.userRepository.validate(UserInput)
  }
}

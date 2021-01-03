import { Request } from 'express'
import { UsersService } from './user/user.service'

type auth = {
  user: any
  authUserService: UsersService
}
export type AuthenticatedRequest = Request & auth

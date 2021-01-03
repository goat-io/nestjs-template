import { Module } from '@nestjs/common'
import { RoleModule } from '../roles/roles.module'
import { RolesUserController } from '../roles_users/roles_users.controller'
import { UserController } from './user.controller'
import { UsersService } from './user.service'

@Module({
  imports: [RoleModule],
  providers: [UsersService],
  exports: [UsersService, RoleModule],
  controllers: [UserController, RolesUserController],
})
export class UsersModule {}

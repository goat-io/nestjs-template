import { Module } from '@nestjs/common'
import { RoleModule } from '@goatlab/fluent/dist/core/Nestjs/Auth/Role/roles.module'
import { User } from './user.entity'
import { UserController } from './user.controller'
import { UsersService } from './user.service'
import { createRepository } from '@goatlab/fluent/dist/core/Nestjs/Database/createRepository'

@Module({
  imports: [RoleModule],
  providers: [
    createRepository({
      connectionName: 'MAIN_DATABASE',
      repositoryName: 'USER_REPOSITORY',
      entity: User,
    }),
    UsersService,
  ],
  exports: [UsersService, RoleModule],
  controllers: [UserController],
})
export class UsersModule {}

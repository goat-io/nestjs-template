import { Module } from '@nestjs/common'
import { RoleController } from './roles.controller'
import { RoleService } from './roles.service'

@Module({
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}

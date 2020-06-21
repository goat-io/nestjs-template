import { Module } from '@nestjs/common'
import { kitchensink } from './kitchensink.controller'
import { kitchensinkService } from './kitchensink.service'
import { Connection } from 'typeorm'
import { kitchensinkEntity } from './kitchensink.entity'
import { DatabaseModule } from '../Database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'kitchensink_REPOSITORY',
      useFactory: (connection: Connection) =>
        connection.getRepository(kitchensinkEntity),
      inject: ['MAIN_DATABASE'],
    },
    {
      provide: 'kitchensinkOut_REPOSITORY',
      useFactory: (connection: Connection) =>
        connection.getRepository(kitchensinkEntity),
      inject: ['MAIN_DATABASE'],
    },
    kitchensinkService,
  ],
  controllers: [kitchensink],
})
export class kitchensinkModule {}
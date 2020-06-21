import { Module } from '@nestjs/common'
import { Cats } from './Cats.controller'
import { CatsService } from './Cats.service'
import { Connection } from 'typeorm'
import { CatsEntity } from './Cats.entity'
import { DatabaseModule } from '../Database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'Cats_REPOSITORY',
      useFactory: (connection: Connection) =>
        connection.getRepository(CatsEntity),
      inject: ['MAIN_DATABASE'],
    },
    {
      provide: 'CatsOut_REPOSITORY',
      useFactory: (connection: Connection) =>
        connection.getRepository(CatsEntity),
      inject: ['MAIN_DATABASE'],
    },
    CatsService,
  ],
  controllers: [Cats],
})
export class CatsModule {}
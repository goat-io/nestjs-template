import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PongModule } from './pong/pong.module'
import { CatsModule } from './cats/Cats.module'
import { GoatModules } from '@goatlab/fluent/dist/core/Nestjs/GoatApp'
import { DatabaseModule } from './Database/database.module'
import { join } from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          rootPath: join(__dirname, '../'),
        }),
      ],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../.goat/manager'),
      exclude: ['/explorer*'],
    }),
    PongModule,
    CatsModule,
    ...GoatModules,
  ],
})
export class MyApp {}

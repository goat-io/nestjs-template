import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './Database/database.module'
import { GoatModules } from '@goatlab/fluent/dist/core/Nestjs/GoatApp'
import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
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
    ...GoatModules,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../.goat/manager'),
      exclude: ['/explorer*'],
    }),
  ],
})
export class MyApp {}

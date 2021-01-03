import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database.module'
import { AuthModule as GoatAuth } from './auth/auth.module'
import { GoatModules } from '@goatlab/fluent/dist/core/Nestjs/GoatApp'
import { Module } from '@nestjs/common'
import { OrganizationsModule } from 'organizations/organizations.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { UsersModule } from './auth/user/user.module'
import { join } from 'path'

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          rootPath: join(__dirname, '../../'),
        }),
      ],
    }),
    UsersModule,
    ...GoatModules,
    GoatAuth,
    OrganizationsModule,
    /*
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../.goat/manager'),
      exclude: ['/explorer*'],
    }),
    */
  ],
})
export class MyApp {}

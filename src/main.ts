// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

import { AllExceptionsFilter } from '@goatlab/fluent/dist/core/Nestjs/http-exceptions.filter'
import { Bash } from '@goatlab/fluent/dist/Helpers/Bash'
import { Fluent } from '@goatlab/fluent/dist/Fluent'
import { Form } from '@goatlab/fluent/dist/core/Nestjs/Form/form.entity'
import { Log } from '@goatlab/fluent/dist/Log/Logger'
import { NestFactory } from '@nestjs/core'
import { Organization } from 'organizations/organizations.entity'
import { PackageInfo } from '@goatlab/fluent/dist/core/Loopback/goat'
import { Role } from './auth/roles/roles.entity'
import { RolesUser } from './auth/roles_users/roles_user.entity'
import { User } from './auth/user/user.entity'
import { createConnection } from '@goatlab/fluent/dist/core/Nestjs/Database/createConnection'
import helmet from 'fastify-helmet'
import { join } from 'path'
import { watch } from 'chokidar'

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const pkg: PackageInfo = require('../package.json')

let app: NestFastifyApplication

async function bootstrap() {
  const entities = [User, Role, RolesUser, Form, Organization]
  await createConnection({
    connectionName: 'LOCAL_DB',
    type: 'sqlite',
    databaseName: 'goat.db',
    entitiesPath: [Role, Form],
  }).useFactory()

  await Fluent.models(entities)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { MyApp } = require('./application')
  app = await NestFactory.create<NestFastifyApplication>(
    MyApp,
    new FastifyAdapter(),
  )

  app.register(helmet, {
    // Disabled just to show Swagger
    contentSecurityPolicy: false,
  })

  const options = new DocumentBuilder()
    .setTitle(pkg.name)
    .setDescription(pkg.description)
    .setVersion(pkg.version)
    .addServer(`http://localhost:${process.env.PORT}`)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'token',
    )
    .build()

  app.useGlobalFilters(new AllExceptionsFilter())
  app.enableCors()
  app.enableShutdownHooks()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('explorer', app, document, {})
  /**
   * Start the app
   */
  await app.listen(parseInt(process.env.PORT), '0.0.0.0')
}

const restartServer = async () => {
  Log.info('Server Stopped')
  await app.close()
  const path = join(__dirname, '../')
  Bash.execute(`npm start --prefix ${path}`)
  Log.info('Server Started')
}
watch(join(__dirname, '../src/goat.db')).on('all', (event: string) => {
  if (event === 'change') {
    restartServer()
  }
})

bootstrap()

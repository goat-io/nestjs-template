import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { PackageInfo } from '@goatlab/fluent/dist/core/Loopback/goat'
import { AllExceptionsFilter } from '@goatlab/fluent/dist/core/Nestjs/http-exceptions.filter'
import { Bash } from '@goatlab/fluent/dist/Helpers/Bash'
import { Log } from '@goatlab/fluent/dist/Log/Logger'
export const pkg: PackageInfo = require('../package.json')

import { MyApp } from './application'
import { join } from 'path'
import { watch } from 'chokidar'

let app: NestFastifyApplication

async function bootstrap() {
  app = await NestFactory.create<NestFastifyApplication>(
    MyApp,
    new FastifyAdapter(),
  )

  const options = new DocumentBuilder()
    .setTitle(pkg.name)
    .setDescription(pkg.description)
    .setVersion(pkg.version)
    .addBearerAuth()
    .build()

  app.useGlobalFilters(new AllExceptionsFilter())
  app.enableCors()
  app.enableShutdownHooks()
  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('explorer', app, document, {})
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

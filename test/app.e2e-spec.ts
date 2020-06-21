import { INestApplication } from '@nestjs/common'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'

import { MyApp } from '../src/application'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MyApp],
    }).compile()

    app = moduleFixture.createNestApplication(new FastifyAdapter())
    await app.init()
    app.getHttpAdapter().getInstance().ready()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })
})

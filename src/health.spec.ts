import * as request from 'supertest'

import { Test, TestingModule } from '@nestjs/testing'

import { FastifyAdapter } from '@nestjs/platform-fastify'
import { Fluent } from '@goatlab/fluent/dist/Fluent'
import { INestApplication } from '@nestjs/common'
import { MyApp } from './application'
import { User } from './auth/user/user.entity'
import { UsersService } from './auth/user/user.service'

jest.setTimeout(3 * 60 * 1000)

describe('Test User profile validation', () => {
  let users: UsersService
  let app: INestApplication
  beforeAll(async () => {
    await Fluent.models([User])
    users = new UsersService()

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MyApp],
    }).compile()

    app = moduleFixture.createNestApplication(new FastifyAdapter())
    await app.init()
    app.getHttpAdapter().getInstance().ready()
  })

  it('Should return health info', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .then(response => {
        expect(response.body.status).toBe('ok')
      })
  })
})

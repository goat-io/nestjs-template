import { Test, TestingModule } from '@nestjs/testing'

import { PongController } from './pong.controller'
import { PongService } from './pong.service'

describe('AppController', () => {
  let appController: PongController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PongController],
      providers: [PongService],
    }).compile()

    appController = app.get<PongController>(PongController)
  })

  describe('root', () => {
    it('should return "ping"', () => {
      expect(appController.getHello()).toBe('ping')
    })
  })
})

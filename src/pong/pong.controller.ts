import { Controller, Get } from '@nestjs/common'

import { PongService } from './pong.service'

@Controller()
export class PongController {
  constructor(private readonly appService: PongService) {}

  @Get('/pong')
  getHello(): string {
    return this.appService.getHello()
  }
}

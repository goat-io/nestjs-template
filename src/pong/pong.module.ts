import { Module } from '@nestjs/common'
import { PongController } from './pong.controller'
import { PongService } from './pong.service'

@Module({
  providers: [PongService],
  controllers: [PongController],
})
export class PongModule {}

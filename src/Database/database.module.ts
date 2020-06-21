import { Module, Global } from '@nestjs/common'
import { Databases } from './database.providers'

@Global()
@Module({
  providers: [...Databases],
  exports: [...Databases],
})
export class DatabaseModule {}

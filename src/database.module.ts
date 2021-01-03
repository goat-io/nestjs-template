import * as admin from 'firebase-admin'

import { Global, Module } from '@nestjs/common'

import { FirebaseInit } from '@goatlab/fluent/dist/Providers/Firebase/FirebaseInit'
import { createConnection } from '@goatlab/fluent/dist/core/Nestjs/Database/createConnection'
import { join } from 'path'

if (process.env.DATABASE_FIREBASE_NAME) {
  if (admin.apps.length === 0) {
    try {
      FirebaseInit({
        host: process.env.DATABASE_FIREBASE_HOST || undefined,
        port: Number(process.env.DATABASE_FIREBASE_PORT) || undefined,
        databaseName: process.env.DATABASE_FIREBASE_NAME,
        serviceAccountPath: join(
          __dirname,
          process.env.NODE_ENV === 'test' ? '../' : '../..',
          process.env.DATABASE_FIREBASE_SERVICE_ACCOUNT_PATH,
        ),
      })
    } catch (error) {
      throw error
    }
  }
}

const Databases: any[] = [
  createConnection({
    connectionName: 'MAIN_DATABASE',
    type: 'firebase',
  }),
]

@Global()
@Module({
  providers: [...Databases],
  exports: [...Databases],
})
export class DatabaseModule {}

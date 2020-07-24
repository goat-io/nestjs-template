import { FirebaseInit } from '@goatlab/fluent/dist/Providers/Firebase/FirebaseInit'
import { createConnection } from '@goatlab/fluent/dist/core/Nestjs/Database/createConnection'
import { join } from 'path'

if (process.env.DATABASE_FIREBASE_NAME) {
  FirebaseInit({
    host: process.env.DATABASE_FIREBASE_HOST || undefined,
    port: Number(process.env.DATABASE_FIREBASE_PORT) || undefined,
    databaseName: process.env.DATABASE_FIREBASE_NAME,
    serviceAccountPath: join(
      __dirname,
      '../..',
      process.env.DATABASE_FIREBASE_SERVICE_ACCOUNT_PATH,
    ),
  })
}

export const Databases: any[] = [
  createConnection({
    connectionName: 'MAIN_DATABASE',
    type: 'firebase',
    serviceAccountPath: `${__dirname}/../../1ck-dev.service-account.json`,
  }),
]

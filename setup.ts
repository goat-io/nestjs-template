import * as admin from 'firebase-admin'

import { FirebaseInit } from '@goatlab/fluent/dist/Providers/Firebase/FirebaseInit'
import { join } from 'path'

if (process.env.DATABASE_FIREBASE_NAME) {
  if (admin.apps.length === 0) {
    try {
      FirebaseInit({
        databaseName: process.env.DATABASE_FIREBASE_NAME,
        serviceAccountPath: join(
          __dirname,
          process.env.DATABASE_FIREBASE_SERVICE_ACCOUNT_PATH,
        ),
      })
    } catch (error) {
      throw error
    }
  }
}

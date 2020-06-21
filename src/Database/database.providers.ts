import { createConnection } from 'typeorm'

export const Databases = [
  {
    provide: 'MAIN_DATABASE',
    useFactory: async () => {
      const url = process.env.MONGO_URL
      return createConnection({
        type: 'mongodb',
        username: 'user',
        password: 'user',
        host: '127.0.0.1',
        port: 27017,
        database: 'goat',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        entities: [
          `${__dirname}/../*/*.entity{.ts,.js}`,
          `${__dirname}/../../node_modules/@goatlab/fluent/dist/core/Nestjs/Auth/User/*.entity{.ts,.js}`,
        ],
      })
    },
  },
]

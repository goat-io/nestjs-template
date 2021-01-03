 <p align="center">Healium - Backend</p>

## Description and Features

- Built with [Nest.JS](https://github.com/nestjs/nest)
- [Fastify](https://www.fastify.io/) as base node framework
- [Helmet](https://github.com/fastify/fastify-helmet) to secure the HTTP(s) requests
- [Fluent](https://github.com/goat-io/fluent) as ORM
- [Firebase](https://firebase.google.com) as Database
- [Swagger](https://swagger.io/) as API docs
- Completely automated pipeline using [Github Actions](https://github.com/features/actions) for CI/CD
- Deployed using [Google App Engine](https://cloud.google.com/appengine)

## See it in action!

The application was deployed without minimum scaling, so it could take a while to spin up the first server (Just give it a few seconds =) )
Deployed Backend and Swagger: [Check this link](https://nc-challenge.ew.r.appspot.com/explorer)
![image](https://user-images.githubusercontent.com/48744933/99884286-5f5ccd80-2c2d-11eb-96c7-5016ac8d44dd.png)

## Installation

```bash
$ yarn
```

## Running the app

- Generate and include your Service Account JSON file.

- Copy the `.env.example` file to `.env` and fill out your environment variables. Then, run the following commands:

```bash
# Run the server in development mode
$ npm run start:dev

or

# Run the server in development mode
$ yarn start:dev
```

- Don't forget to change the DATABASE_FIREBASE_SERVICE_ACCOUNT_PATH env variable, with the name and location of your service account

```bash
DATABASE_FIREBASE_SERVICE_ACCOUNT_PATH=./my-service-account.json
```

## Test

```bash
# Run all tests
$ npm run test

or

$ yarn test
```

## Firebase Database

![image](https://user-images.githubusercontent.com/48744933/99883000-a7c3bd80-2c24-11eb-889e-73a69b6bb3c6.png)

## License

[MIT licensed](LICENSE).

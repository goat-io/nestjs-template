const Orm = require('@goatlab/fluent/dist/Providers/TypeOrm/TypeOrmConnector')
const Entity = require('@goatlab/fluent/dist/core/Nestjs/Form/form.entity')
const Dto = require('@goatlab/fluent/dist/core/Nestjs/Form/form.dto')
const generate = require('@goatlab/fluent/dist/core/Generator/generate')
  .generate
const path = require('path')
const Formio = require('@goatlab/fluent/dist/Helpers/Formio').Formio

const generator = async () => {
  const connection = await Orm.createConnection({
    type: 'sqlite',
    database: path.join(__dirname, '../src/goat.db'),
    entities: [Entity.Form],
    logging: false,
    synchronize: true,
  })

  const repository = connection.getRepository(Entity.Form)

  const GoatModel = new Orm.TypeOrmConnector({
    repository: repository,
  })
  const json = await GoatModel.all()
  const forms = []

  json.forEach(form => {
    forms.push(Formio.getter(form))
  })

  await generate(forms, __dirname, 'Loopback4')
}

generator()

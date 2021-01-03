const Orm = require('@goatlab/fluent/dist/Providers/TypeOrm/TypeOrmConnector')
const Entity = require('@goatlab/fluent/dist/core/Nestjs/Form/form.entity')
const generate = require('@goatlab/fluent/dist/core/Generator/generate')
  .generate
const path = require('path')
const Formio = require('@goatlab/fluent/dist/Helpers/Formio').Formio
const generator = async () => {
  await Orm.createConnection({
    type: 'sqlite',
    database: path.join(__dirname, '../src/goat.db'),
    entities: [Entity.Form],
    logging: false,
    synchronize: false,
  })

  const GoatModel = new Orm.TypeOrmConnector(Entity.Form)
  const json = await GoatModel.all()
  const forms = []

  json.forEach(form => {
    forms.push(Formio.getter(form))
  })

  await generate(forms, __dirname, 'Loopback4')
}

generator()

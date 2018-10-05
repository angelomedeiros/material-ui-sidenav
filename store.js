const faker = require('faker')

module.exports = () => {
  const dados = { writers: [], texts: [] }

  for ( let i = 0; i < 15; i++ ) {
    const writer = {
      id: faker.random.uuid(),
      name: faker.name.findName(),
      born: faker.date.past(),
      deceased: faker.date.future(),
      description: faker.lorem.paragraph(),
      image: faker.image.avatar()
    }
    const text = {
      id: faker.random.uuid(),
      writerId: writer.id,
      title: faker.lorem.words(2),
      description: faker.lorem.paragraph(),
      published: faker.random.number({ min: 1000, max: 2000 })
    }

    dados.writers.push(writer)
    dados.texts.push(text)
  }
  
  return dados
}
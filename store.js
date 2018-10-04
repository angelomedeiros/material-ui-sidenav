const faker = require('faker')

module.exports = () => {
  const dados = { writers: [] }

  for ( let i = 0; i < 100; i++ ) {
    const dado = {
      id: faker.random.uuid(),
      name: faker.name.findName(),
      born: faker.date.past(),
      deceased: faker.date.future(),
      description: faker.lorem.paragraph(),
      image: faker.image.avatar()
    }
    dados.writers.push(dado)
  }
  
  return dados
}
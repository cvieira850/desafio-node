import { ClientPgRepository } from './client'
import { Connection, getConnection } from 'typeorm'
import createConnection from '../typeorm/index'
let connection: Connection
describe('Client Pg Repository', () => {
  beforeAll(async () => {
    connection = await createConnection()

    await connection.query('DROP TABLE IF EXISTS cities')
    await connection.query('DROP TABLE IF EXISTS clients')
    await connection.query('DROP TABLE IF EXISTS migrations')

    await connection.runMigrations()
  })

  beforeEach(async () => {
    await connection.query('DELETE FROM cities')
    await connection.query('DELETE FROM clients')
  })

  afterAll(async () => {
    const mainConnection = getConnection()
    await mainConnection.close()
    await connection.close()
  })
  const makeSut = (): ClientPgRepository => {
    return new ClientPgRepository()
  }
  test('Should return an city on success', async () => {
    const sut = makeSut()
    const client = await sut.add({
      name: 'valid_name',
      lastname: 'valid_lastname',
      genre: 'valid_genre',
      age: 'valid_age',
      city: 'valid_city',
      birthdate: 'valid_birthdate'
    })
    expect(client).toBeTruthy()
    expect(client.id).toBeTruthy()
    expect(client.name).toBe('valid_name')
    expect(client.lastname).toBe('valid_lastname')
    expect(client.genre).toBe('valid_genre')
    expect(client.age).toBe('valid_age')
    expect(client.city).toBe('valid_city')
    expect(client.birthdate).toBe('valid_birthdate')
  })
})

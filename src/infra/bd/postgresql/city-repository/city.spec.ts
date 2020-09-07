import { CityPgRepository } from './city'
import { Connection, getConnection } from 'typeorm'
import createConnection from '../typeorm/index'
let connection: Connection
describe('City Pg Repository', () => {
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
  const makeSut = (): CityPgRepository => {
    return new CityPgRepository()
  }
  test('Should return an city on success', async () => {
    const sut = makeSut()
    const city = await sut.add({
      name: 'valid_name',
      state: 'valid_state'
    })
    expect(city).toBeTruthy()
    expect(city.id).toBeTruthy()
    expect(city.name).toBe('valid_name')
    expect(city.state).toBe('valid_state')
  })
})

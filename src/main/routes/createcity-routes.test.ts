
import app from '../config/app'
import request from 'supertest'
import { Connection, getConnection } from 'typeorm'
import createConnection from '../../infra/bd/postgresql/typeorm/index'
let connection: Connection
describe('Create City Routes', () => {
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
  test('Should return a city on success', async () => {
    await request(app)
      .post('/api/createcity')
      .send({
        name: 'Curicica',
        state: 'RJ'
      })
      .expect(200)
  })
})

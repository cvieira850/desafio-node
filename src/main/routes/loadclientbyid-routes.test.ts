
import app from '../config/app'
import request from 'supertest'
import { Connection, getConnection } from 'typeorm'
import createConnection from '../../infra/bd/postgresql/typeorm/index'
let connection: Connection
describe('Load Client By Id Route', () => {
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
  test('Should return 200 on load client by id ', async () => {
    const res = await request(app)
      .post('/api/createclient')
      .send({
        name: 'Caio',
        lastname: 'Vieira',
        genre: 'male',
        age: '20',
        city: 'RJ',
        birthdate: '1991-12-13'
      })
    const { id } = res.body
    await request(app)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      .get(`/api/loadclient/${id}`)
      .expect(200)
  })
})

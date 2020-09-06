import { CreateCityController } from './createcity'
import { MissingParamError } from '../../errors/missing-param-error'

describe('Create City Controller', () => {
  test('Should return 400 if no name is provided ', () => {
    const sut = new CreateCityController()
    const httpRequest = {
      body: {
        state: 'valid_state'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
  test('Should return 400 if no state is provided ', () => {
    const sut = new CreateCityController()
    const httpRequest = {
      body: {
        name: 'valid_name'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('state'))
  })
})

import { CreateCityController } from './createcity'
import { MissingParamError, ServerError, InvalidParamError } from '../../errors'
import { AddCity,AddCityModel, StateValidator, CityModel } from './createcity-protocols'

interface SutTypes {
  sut: CreateCityController
  stateValidatorStub: StateValidator
  addCityStub: AddCity
}
const makeAddCity = (): AddCity => {
  class AddCityStub implements AddCity {
    async add (city: AddCityModel): Promise<CityModel> {
      const fakeCity = {
        id: 'valid_id',
        name: 'valid_name',
        state: 'valid_state'
      }
      return new Promise(resolve => resolve(fakeCity))
    }
  }
  return new AddCityStub()
}
const makeStateValidator = (): StateValidator => {
  class StateValidatorStub implements StateValidator {
    isValid (state: string): boolean {
      return true
    }
  }
  return new StateValidatorStub()
}
const makeSut = (): SutTypes => {
  const stateValidatorStub = makeStateValidator()
  const addCityStub = makeAddCity()
  const sut = new CreateCityController(stateValidatorStub, addCityStub)
  return {
    sut,
    stateValidatorStub,
    addCityStub
  }
}

describe('Create City Controller', () => {
  test('Should return 400 if no name is provided ', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        state: 'valid_state'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
  test('Should return 400 if no state is provided ', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('state'))
  })
  test('Should return 400 if an invalid state is provided ', async () => {
    const { sut , stateValidatorStub } = makeSut()
    jest.spyOn(stateValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'valid_name',
        state: 'invalid_state'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('state'))
  })
  test('Should returns 500 if stateValidator throws', async () => {
    const { sut, stateValidatorStub } = makeSut()
    jest.spyOn(stateValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        state: 'any_state'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
  test('Should call StateValidator with correct state', async () => {
    const { sut, stateValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(stateValidatorStub, 'isValid')

    const httpRequest = {
      body: {
        name: 'any_name',
        state: 'any_state'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_state')
  })
  test('Should call AddCity with correct values', async () => {
    const { sut, addCityStub } = makeSut()
    const addSpy = jest.spyOn(addCityStub, 'add')

    const httpRequest = {
      body: {
        name: 'valid_name',
        state: 'valid_state'
      }
    }
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      state: 'valid_state'
    })
  })
  test('Should return 500 if AddCity throws', async () => {
    const { sut, addCityStub } = makeSut()
    jest.spyOn(addCityStub,'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        state: 'any_state'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'valid_name',
        state: 'valid_state'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      state: 'valid_state'
    })
  })
})

import { CreateCityController } from './createcity'
import { MissingParamError, ServerError, InvalidParamError } from '../../errors'
import { StateValidator } from '../../protocols'
interface SutTypes {
  sut: CreateCityController
  stateValidatorStub: StateValidator
}
const makeStateValidatorWithError = (): StateValidator => {
  class StateValidatorStub implements StateValidator {
    isValid (state: string): boolean {
      throw new Error()
    }
  }

  return new StateValidatorStub()
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
  const sut = new CreateCityController(stateValidatorStub)
  return {
    sut,
    stateValidatorStub
  }
}

describe('Create City Controller', () => {
  test('Should return 400 if no name is provided ', () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('state'))
  })
  test('Should return 400 if an invalid state is provided ', () => {
    const { sut , stateValidatorStub } = makeSut()
    jest.spyOn(stateValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'valid_name',
        state: 'invalid_state'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('state'))
  })
  test('Should returns 500 if stateValidator throws', () => {
    const stateValidatorStub = makeStateValidatorWithError()
    const sut = new CreateCityController(stateValidatorStub)
    const httpRequest = {
      body: {
        name: 'any_name',
        state: 'any_state'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
  test('Should call StateValidator with correct state', () => {
    const { sut, stateValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(stateValidatorStub, 'isValid')

    const httpRequest = {
      body: {
        name: 'any_name',
        state: 'any_state'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_state')
  })
})

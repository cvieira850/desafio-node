import { StateValidatorAdapter } from './state-validator'
import { StateValidatorInterface } from '../infra/validators/protocols/state-validator'

interface SutTypes {
  sut: StateValidatorAdapter
  stateValidatorStub: StateValidatorInterface
}

const makeStateValidator = (): StateValidatorInterface => {
  class StateValidatorLibStub {
    isState (state: string): boolean {
      return true
    }
  }
  return new StateValidatorLibStub()
}
const makeSut = (): SutTypes => {
  const stateValidatorStub = makeStateValidator()

  const sut = new StateValidatorAdapter(stateValidatorStub)
  return {
    sut,stateValidatorStub
  }
}
describe('StateValidatorAdapter', () => {
  test('Should return false if validator returns false', () => {
    const { sut,stateValidatorStub } = makeSut()
    jest.spyOn(stateValidatorStub, 'isState').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_state')
    expect(isValid).toBe(false)
  })
  test('Should return true if validator returns true', () => {
    const { sut } = makeSut()
    const isValid = sut.isValid('valid_state')
    expect(isValid).toBe(true)
  })
  test('Should call state validator with correct state', () => {
    const { sut,stateValidatorStub } = makeSut()
    const isStateSpy = jest.spyOn(stateValidatorStub,'isState')
    sut.isValid('any_state')
    expect(isStateSpy).toBeCalledWith('any_state')
  })
})

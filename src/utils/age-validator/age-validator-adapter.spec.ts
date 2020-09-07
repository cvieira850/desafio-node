import { AgeValidatorAdapter } from './age-validator-adapter'
import { AgeValidatorInterface } from '../../infra/validators/age-validator/protocols/age-validator'

interface SutTypes {
  sut: AgeValidatorAdapter
  ageValidatorStub: AgeValidatorInterface
}

const makeAgeValidator = (): AgeValidatorInterface => {
  class AgeValidatorLibStub {
    isAge (age: string): boolean {
      return true
    }
  }
  return new AgeValidatorLibStub()
}
const makeSut = (): SutTypes => {
  const ageValidatorStub = makeAgeValidator()

  const sut = new AgeValidatorAdapter(ageValidatorStub)
  return {
    sut,ageValidatorStub
  }
}

describe('AgeValidatorAdapter', () => {
  test('Should return false if age validator returns false', () => {
    const { sut,ageValidatorStub } = makeSut()
    jest.spyOn(ageValidatorStub,'isAge').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid-age')
    expect(isValid).toBe(false)
  })
  test('Should return true if age validator returns true', () => {
    const { sut } = makeSut()
    const isValid = sut.isValid('valid-age')
    expect(isValid).toBe(true)
  })

  test('Should calls age validator with correct age', () => {
    const { sut, ageValidatorStub } = makeSut()
    const spyIsBirth = jest.spyOn(ageValidatorStub, 'isAge')
    sut.isValid('valid-age')
    expect(spyIsBirth).toBeCalledWith('valid-age')
  })
})

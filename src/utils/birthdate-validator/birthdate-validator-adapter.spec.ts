import { BirthdateValidatorAdapter } from './birthdate-validator-adapter'
import { BirthdateValidatorInterface } from '../../infra/validators/birthdate-validator/protocols/birthdate-validator'

interface SutTypes {
  sut: BirthdateValidatorAdapter
  birthdateValidatorStub: BirthdateValidatorInterface
}

const makeBirthdateValidator = (): BirthdateValidatorInterface => {
  class BirthdateValidatorLibStub {
    isBirth (birthdate: string): boolean {
      return true
    }
  }
  return new BirthdateValidatorLibStub()
}
const makeSut = (): SutTypes => {
  const birthdateValidatorStub = makeBirthdateValidator()

  const sut = new BirthdateValidatorAdapter(birthdateValidatorStub)
  return {
    sut,birthdateValidatorStub
  }
}

describe('BirthdateValidatorAdapter', () => {
  test('Should return false if birthdate validator returns false', () => {
    const { sut,birthdateValidatorStub } = makeSut()
    jest.spyOn(birthdateValidatorStub,'isBirth').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid-date')
    expect(isValid).toBe(false)
  })
  test('Should return true if birthdate validator returns true', () => {
    const { sut } = makeSut()
    const isValid = sut.isValid('valid-date')
    expect(isValid).toBe(true)
  })

  test('Should calls birthdate validator with correct date', () => {
    const { sut, birthdateValidatorStub } = makeSut()
    const spyIsBirth = jest.spyOn(birthdateValidatorStub, 'isBirth')
    sut.isValid('valid-date')
    expect(spyIsBirth).toBeCalledWith('valid-date')
  })
})

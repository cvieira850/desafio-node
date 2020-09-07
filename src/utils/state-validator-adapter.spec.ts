import { StateValidatorAdapter } from './state-validator'

describe('StateValidatorAdapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new StateValidatorAdapter()
    const isValid = sut.isValid('invalid_state')
    expect(isValid).toBe(false)
  })
})

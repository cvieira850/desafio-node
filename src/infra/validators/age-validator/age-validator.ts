import { AgeValidatorInterface } from './protocols/age-validator'

export class AgeValidatorLib implements AgeValidatorInterface {
  isAge (age: string): boolean {
    if (/^\d+$/.test(age)) {
      if (parseInt(age) > 0 && parseInt(age) < 120) {
        return true
      }
      return false
    }
    return false
  }
}

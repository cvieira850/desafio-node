import { AgeValidator } from '../../presentation/protocols/age-validator'
import { AgeValidatorLib } from '../../infra/validators/age-validator/age-validator'
export class AgeValidatorAdapter implements AgeValidator {
  protected readonly ageValidatorLib: AgeValidatorLib
  constructor (ageValidatorLib: AgeValidatorLib) {
    this.ageValidatorLib = ageValidatorLib
  }

  isValid (age: string): boolean {
    return this.ageValidatorLib.isAge(age)
  }
}

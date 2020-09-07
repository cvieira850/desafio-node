import { BirthDateValidator } from '../../presentation/protocols/birthdate-validator'
import { BirthdateValidatorLib } from '../../infra/validators/birthdate-validator/birthdate-validator'
export class BirthdateValidatorAdapter implements BirthDateValidator {
  protected readonly birthdateValidatorLib: BirthdateValidatorLib
  constructor (birthdateValidatorLib: BirthdateValidatorLib) {
    this.birthdateValidatorLib = birthdateValidatorLib
  }

  isValid (birthdate: string): boolean {
    return this.birthdateValidatorLib.isBirth(birthdate)
  }
}

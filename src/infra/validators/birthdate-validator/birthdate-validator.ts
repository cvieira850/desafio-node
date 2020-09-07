import { BirthdateValidatorInterface } from './protocols/birthdate-validator'
import moment from 'moment'
export class BirthdateValidatorLib implements BirthdateValidatorInterface {
  isBirth (birthdate: string): boolean {
    const isValid = moment(birthdate).isValid()
    if (isValid) {
      return moment() > moment(birthdate)
    } else {
      return false
    }
  }
}

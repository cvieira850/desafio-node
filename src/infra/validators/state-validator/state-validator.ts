import { StateValidatorInterface } from './protocols/state-validator'

export class StateValidatorLib implements StateValidatorInterface {
  isState (state: string): boolean {
    switch (state) {
      case 'ac':
        return true
      case 'al':
        return true
      case 'ap':
        return true
      case 'am':
        return true
      case 'ba':
        return true
      case 'ce':
        return true
      case 'df':
        return true
      case 'es':
        return true
      case 'go':
        return true
      case 'ma':
        return true
      case 'mt':
        return true
      case 'ms':
        return true
      case 'mg':
        return true
      case 'pa':
        return true
      case 'pb':
        return true
      case 'pr':
        return true
      case 'pe':
        return true
      case 'pi':
        return true
      case 'rj':
        return true
      case 'rn':
        return true
      case 'rs':
        return true
      case 'ro':
        return true
      case 'rr':
        return true
      case 'sc':
        return true
      case 'sp':
        return true
      case 'se':
        return true
      case 'to':
        return true
      default :
        return false
    }
  }
}

import { StateValidator } from '../../presentation/protocols/state-validator'
import { StateValidatorLib } from '../../infra/validators/state-validator/state-validator'

export class StateValidatorAdapter implements StateValidator {
  private readonly stateValidatorlib: StateValidatorLib
  constructor (stateValidatorLib: StateValidatorLib) {
    this.stateValidatorlib = stateValidatorLib
  }

  isValid (state: string): boolean {
    return this.stateValidatorlib.isState(state.toLowerCase())
  }
}

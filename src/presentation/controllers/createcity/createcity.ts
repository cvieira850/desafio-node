import { HttpRequest, HttpResponse, Controller, StateValidator } from '../../protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'

export class CreateCityController implements Controller {
  private readonly stateValidator: StateValidator
  constructor (stateValidator: StateValidator) {
    this.stateValidator = stateValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const { state } = httpRequest.body
      const requiredFields = ['name','state']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.stateValidator.isValid(state)
      if (!isValid) {
        return badRequest(new InvalidParamError('state'))
      }
    } catch (error) {
      return serverError()
    }
  }
}

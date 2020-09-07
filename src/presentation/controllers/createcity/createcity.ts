import { HttpRequest, HttpResponse } from '../../protocols/http'
import { MissingParamError } from '../../errors/missing-param-error'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { badRequest } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { StateValidator } from '../../protocols/state-validator'
import { ServerError } from '../../errors/server-error'

export class CreateCityController implements Controller {
  private readonly stateValidator: StateValidator
  constructor (stateValidator: StateValidator) {
    this.stateValidator = stateValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name','state']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.stateValidator.isValid(httpRequest.body.state)
      if (!isValid) {
        return badRequest(new InvalidParamError('state'))
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}

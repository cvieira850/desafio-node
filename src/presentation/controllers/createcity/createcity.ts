import { HttpRequest, HttpResponse, Controller, StateValidator, AddCity } from './createcity-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

export class CreateCityController implements Controller {
  private readonly stateValidator: StateValidator
  private readonly addCity: AddCity
  constructor (stateValidator: StateValidator, addCity: AddCity) {
    this.stateValidator = stateValidator
    this.addCity = addCity
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name,state } = httpRequest.body
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
      const city = await this.addCity.add({
        name,
        state
      })
      return ok(city)
    } catch (error) {
      return serverError()
    }
  }
}

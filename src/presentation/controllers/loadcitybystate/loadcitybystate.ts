import { Controller, HttpRequest, HttpResponse, LoadCityByState, InvalidParamError, ok,forbidden, serverError } from './loadcitybystate-protocols'

export class LoadCityByStateController implements Controller {
  constructor (
    private readonly loadCityByState: LoadCityByState
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { state } = httpRequest.params
      const city = await this.loadCityByState.loadByState(state)
      if (!city) {
        return forbidden(new InvalidParamError('state'))
      }
      return ok(city)
    } catch (error) {
      return serverError()
    }
  }
}

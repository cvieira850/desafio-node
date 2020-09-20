import { Controller, HttpRequest, HttpResponse, LoadCityByName, InvalidParamError, ok,forbidden, serverError } from './loadcitybyname-protocols'

export class LoadCityByNameController implements Controller {
  constructor (
    private readonly loadCityByName: LoadCityByName
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name } = httpRequest.params
      const city = await this.loadCityByName.loadByName(name)
      if (!city) {
        return forbidden(new InvalidParamError('name'))
      }
      return ok(city)
    } catch (error) {
      return serverError()
    }
  }
}

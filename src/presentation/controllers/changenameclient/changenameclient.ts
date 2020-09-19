import { Controller, HttpRequest, HttpResponse, LoadClientById } from './changenameclient-protocols'

export class ChangeClientNameController implements Controller {
  constructor (private readonly loadClientById: LoadClientById) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadClientById.loadById(httpRequest.params.id)
    return null
  }
}

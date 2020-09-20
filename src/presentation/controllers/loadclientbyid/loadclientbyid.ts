import { Controller, HttpRequest, HttpResponse, LoadClientById, InvalidParamError, ok,forbidden, serverError } from './loadclientbyid-protocols'

export class LoadClientByIdController implements Controller {
  constructor (
    private readonly loadClientById: LoadClientById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const client = await this.loadClientById.loadById(id)
      if (!client) {
        return forbidden(new InvalidParamError('id'))
      }
      return ok(client)
    } catch (error) {
      return serverError()
    }
  }
}

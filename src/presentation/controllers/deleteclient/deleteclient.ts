import { Controller, HttpRequest, HttpResponse, DeleteClient,ok,serverError } from './deleteclient-protocols'

export class DeleteClientController implements Controller {
  constructor (
    private readonly deleteClient: DeleteClient
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      await this.deleteClient.delete(id)
      return ok(null)
    } catch (error) {
      return serverError()
    }
  }
}

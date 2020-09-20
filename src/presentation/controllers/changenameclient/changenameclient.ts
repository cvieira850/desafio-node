import { Controller, HttpRequest, HttpResponse, ChangeClientName,LoadClientById, InvalidParamError, ok,forbidden, serverError } from './changenameclient-protocols'

export class ChangeClientNameController implements Controller {
  constructor (
    private readonly loadClientById: LoadClientById,
    private readonly changeClientName: ChangeClientName
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const { name } = httpRequest.body
      const client = await this.loadClientById.loadById(id)
      if (!client) {
        return forbidden(new InvalidParamError('id'))
      }
      if (!name) {
        return forbidden(new InvalidParamError('name'))
      }
      const clientWithNewName = await this.changeClientName.update({
        id,
        name
      })
      return ok(clientWithNewName)
    } catch (error) {
      return serverError()
    }
  }
}

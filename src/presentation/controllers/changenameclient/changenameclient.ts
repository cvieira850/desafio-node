import { Controller, HttpRequest, HttpResponse, ChangeClientName,LoadClientById, InvalidParamError, forbidden, serverError } from './changenameclient-protocols'

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
      await this.changeClientName.update({
        id,
        name
      })
      return null
    } catch (error) {
      return serverError()
    }
  }
}

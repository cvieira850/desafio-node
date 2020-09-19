import { Controller, HttpRequest, HttpResponse, LoadClientById } from './changenameclient-protocols'
import { forbidden } from '../../helpers/http-helper'
import { InvalidParamError } from '../../errors'

export class ChangeClientNameController implements Controller {
  constructor (private readonly loadClientById: LoadClientById) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const client = await this.loadClientById.loadById(httpRequest.params.id)
    if (!client) {
      return forbidden(new InvalidParamError('id'))
    }
    return null
  }
}

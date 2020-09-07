import { AddClient,AddClientModel, ClientModel, AddClientRepository } from './db-add-client-protocols'

export class DbAddClient implements AddClient {
  private readonly addClientRepository: AddClientRepository
  constructor (addClientRepository: AddClientRepository) {
    this.addClientRepository = addClientRepository
  }

  async add (clientData: AddClientModel): Promise<ClientModel> {
    const client = await this.addClientRepository.add(clientData)

    return new Promise(resolve => resolve(client))
  }
}

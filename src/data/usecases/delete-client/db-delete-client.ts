import { DeleteClient,DeleteClientRepository } from './db-delete-client-protocols'

export class DbDeleteClient implements DeleteClient {
  constructor (private readonly deleteClientRepository: DeleteClientRepository) {}
  async delete (id: string): Promise<null> {
    await this.deleteClientRepository.delete(id)
    return null
  }
}

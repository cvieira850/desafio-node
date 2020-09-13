import { LoadClientById,ClientModel,LoadClientByIdRepository } from './db-load-client-by-id-protocols'

export class DbLoadClientById implements LoadClientById {
  constructor (private readonly loadClientByIdRepository: LoadClientByIdRepository) {}
  async loadById (id: string): Promise<ClientModel> {
    const client = await this.loadClientByIdRepository.loadById(id)
    return client
  }
}

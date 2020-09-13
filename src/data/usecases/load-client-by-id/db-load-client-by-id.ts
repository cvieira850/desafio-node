import { LoadClientById } from '../../../domain/usecases/load-client-by-id'
import { ClientModel } from '../../../domain/models/client'
import { LoadClientByIdRepository } from '../../protocols/load-client-by-id-repository'

export class DbLoadClientById implements LoadClientById {
  constructor (private readonly loadClientByIdRepository: LoadClientByIdRepository) {}
  async loadById (id: string): Promise<ClientModel> {
    const client = await this.loadClientByIdRepository.loadById(id)
    return client
  }
}

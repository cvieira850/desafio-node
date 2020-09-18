import { ChangeClientName ,ChangeClientNameModel, ClientModel,ChangeClientNameRepository } from './db-change-client-protocols'

export class DbChangeClientName implements ChangeClientName {
  constructor (private readonly changeClientNameRepository: ChangeClientNameRepository) {}
  async update (data: ChangeClientNameModel): Promise<ClientModel> {
    await this.changeClientNameRepository.update(data)
    return null
  }
}

import { ClientModel } from '../../domain/models/client'

export interface LoadClientByIdRepository {
  loadById: (id: string) => Promise<ClientModel>
}

import { AddClientModel } from '../../domain/usecases/add-client'
import { ClientModel } from '../../domain/models/client'

export interface AddClientRepository {
  add: (clientData: AddClientModel) => Promise<ClientModel>
}

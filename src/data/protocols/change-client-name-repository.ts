import { ChangeClientNameModel } from '../../domain/usecases/change-client-name'
import { ClientModel } from '../../domain/models/client'

export interface ChangeClientNameRepository {
  update: (clientData: ChangeClientNameModel) => Promise<ClientModel>

}

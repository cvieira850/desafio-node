import { ChangeClientNameController } from '../../presentation/controllers/changenameclient/changenameclient'
import { DbLoadClientById } from '../../data/usecases/load-client-by-id/db-load-client-by-id'
import { DbChangeClientName } from '../../data/usecases/change-client-name/db-change-client-name'
import { ClientPgRepository } from '../../infra/bd/postgresql/client-repository/client'

export const makeChangeClientNameController = (): ChangeClientNameController => {
  const clientPgRepository = new ClientPgRepository()
  const dbchangeClientName = new DbChangeClientName(clientPgRepository)
  const dbLoadClientById = new DbLoadClientById(clientPgRepository)
  return new ChangeClientNameController(dbLoadClientById,dbchangeClientName)
}

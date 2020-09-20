import { LoadClientByIdController } from '../../presentation/controllers/loadclientbyid/loadclientbyid'
import { DbLoadClientById } from '../../data/usecases/load-client-by-id/db-load-client-by-id'
import { ClientPgRepository } from '../../infra/bd/postgresql/client-repository/client'

export const makeLoadClientByIdController = (): LoadClientByIdController => {
  const clientPgRepository = new ClientPgRepository()
  const dbLoadClientById = new DbLoadClientById(clientPgRepository)
  return new LoadClientByIdController(dbLoadClientById)
}

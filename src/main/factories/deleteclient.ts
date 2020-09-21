import { DeleteClientController } from '../../presentation/controllers/deleteclient/deleteclient'
import { DbDeleteClient } from '../../data/usecases/delete-client/db-delete-client'
import { ClientPgRepository } from '../../infra/bd/postgresql/client-repository/client'

export const makeDeleteClientController = (): DeleteClientController => {
  const clientPgRepository = new ClientPgRepository()
  const dbDeleteClient = new DbDeleteClient(clientPgRepository)
  return new DeleteClientController(dbDeleteClient)
}

import { ClientModel } from '../models/client'

export interface LoadClientById {
  load: (id: string) => Promise<ClientModel>
}

import { ClientModel } from '../models/client'

export interface LoadClientById {
  loadById: (id: string) => Promise<ClientModel>
}

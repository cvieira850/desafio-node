import { ClientModel } from '../models/client'

export interface ChangeClientName {
  change: (name: string) => Promise<ClientModel>
}

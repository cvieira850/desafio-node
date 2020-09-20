import { ClientModel } from '../models/client'

export interface ChangeClientNameModel {
  name: string
  id: string
}

export interface ChangeClientName {
  update: (data: ChangeClientNameModel) => Promise<ClientModel>
}

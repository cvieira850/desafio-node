import { ClientModel } from '../models/client'

export interface AddClientModel {
  name: string
  lastname: string
  genre: string
  age: string
  birthdate: string
  city: string
}

export interface AddClient {
  add: (client: AddClientModel) => Promise<ClientModel>
}

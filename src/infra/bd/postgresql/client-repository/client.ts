/* eslint-disable @typescript-eslint/naming-convention */
import { getRepository } from 'typeorm'
import { AddClientRepository } from '../../../../data/protocols/add-client-repository'
import { AddClientModel } from '../../../../domain/usecases/add-client'
import { ClientModel } from '../../../../domain/models/client'
import Client from '../typeorm/entities/Client'

// import User from '../typeorm/entities/user'
export class ClientPgRepository implements AddClientRepository {
  async add (clientData: AddClientModel): Promise<ClientModel> {
    const ClientRepository = getRepository(Client)
    const ClientCreated = ClientRepository.create(
      clientData
    )
    const { name, lastname,genre, age, city, birthdate, id } = await ClientRepository.save(ClientCreated)
    return {
      name,
      lastname,
      genre,
      age,
      city,
      birthdate,
      id
    }
  }
}

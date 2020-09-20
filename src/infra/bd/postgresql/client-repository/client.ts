/* eslint-disable @typescript-eslint/naming-convention */
import { getRepository } from 'typeorm'
import { AddClientRepository } from '../../../../data/protocols/add-client-repository'
import { AddClientModel } from '../../../../domain/usecases/add-client'
import { ClientModel } from '../../../../domain/models/client'
import Client from '../typeorm/entities/Client'
import { LoadClientByIdRepository } from '../../../../data/protocols/load-client-by-id-repository'
import { ChangeClientNameRepository } from '../../../../data/protocols/change-client-name-repository'
import { ChangeClientNameModel } from '../../../../domain/usecases/change-client-name'

// import User from '../typeorm/entities/user'
export class ClientPgRepository implements AddClientRepository, LoadClientByIdRepository, ChangeClientNameRepository {
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

  async loadById (id: string): Promise<ClientModel> {
    const ClientRepository = getRepository(Client)
    const client = await ClientRepository.findOne(id)
    return client
  }

  async update (data: ChangeClientNameModel): Promise<ClientModel> {
    const ClientRepository = getRepository(Client)
    const client = await ClientRepository.findOne(data.id)
    client.name = data.name
    await ClientRepository.save(client)
    return client
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
import { getRepository } from 'typeorm'
import { AddCityRepository } from '../../../../data/protocols/add-city-repository'
import { AddCityModel } from '../../../../domain/usecases/add-city'
import { CityModel } from '../../../../domain/models/city'
import City from '../typeorm/entities/City'

// import User from '../typeorm/entities/user'
export class CityPgRepository implements AddCityRepository {
  async add (cityData: AddCityModel): Promise<CityModel> {
    const CityRepository = getRepository(City)
    const CityCreated = CityRepository.create(
      cityData
    )
    const { name, state, id } = await CityRepository.save(CityCreated)
    return {
      name,
      state,
      id
    }
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
import { getRepository } from 'typeorm'
import { AddCityRepository } from '../../../../data/protocols/add-city-repository'
import { AddCityModel } from '../../../../domain/usecases/add-city'
import { CityModel } from '../../../../domain/models/city'
import { LoadCityByNameRepository } from '../../../../data/protocols/load-city-by-name-repository'
import City from '../typeorm/entities/City'

// import User from '../typeorm/entities/user'
export class CityPgRepository implements AddCityRepository, LoadCityByNameRepository {
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

  async loadByName (name: string): Promise<CityModel[]> {
    const CityRepository = getRepository(City)
    const cityArray = await CityRepository.find({ where: { name } })
    return cityArray
  }

  async loadByState (state: string): Promise<CityModel[]> {
    const CityRepository = getRepository(City)
    const cityArray = await CityRepository.find({ where: { state } })
    return cityArray
  }
}

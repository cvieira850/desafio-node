import { AddCity,AddCityModel, CityModel, AddCityRepository } from './db-add-city-protocols'

export class DbAddCity implements AddCity {
  private readonly addCityRepository: AddCityRepository
  constructor (addCityRepository: AddCityRepository) {
    this.addCityRepository = addCityRepository
  }

  async add (cityData: AddCityModel): Promise<CityModel> {
    const city = await this.addCityRepository.add(cityData)

    return new Promise(resolve => resolve(city))
  }
}

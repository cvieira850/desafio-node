import { LoadCityByName,CityModel,LoadCityByNameRepository } from './db-load-city-by-name-protocols'

export class DbLoadCityByName implements LoadCityByName {
  constructor (private readonly loadCityByNameRepository: LoadCityByNameRepository) {}
  async loadByName (name: string): Promise<CityModel[]> {
    const city = await this.loadCityByNameRepository.loadByName(name)
    return city
  }
}

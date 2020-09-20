import { LoadCityByState,CityModel,LoadCityByStateRepository } from './db-load-city-by-state-protocols'

export class DbLoadCityByState implements LoadCityByState {
  constructor (private readonly loadCityByStateRepository: LoadCityByStateRepository) {}
  async loadByState (state: string): Promise<CityModel[]> {
    const city = await this.loadCityByStateRepository.loadByState(state)
    return city
  }
}

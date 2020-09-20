import { CityModel } from '../../domain/models/city'

export interface LoadCityByNameRepository {
  loadByName: (name: string) => Promise<CityModel[]>
}

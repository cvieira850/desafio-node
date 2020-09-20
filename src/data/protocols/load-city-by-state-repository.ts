import { CityModel } from '../../domain/models/city'

export interface LoadCityByStateRepository {
  loadByState: (state: string) => Promise<CityModel[]>
}

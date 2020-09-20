import { CityModel } from '../models/city'

export interface LoadCityByName {
  loadByName: (name: string) => Promise<CityModel>
}

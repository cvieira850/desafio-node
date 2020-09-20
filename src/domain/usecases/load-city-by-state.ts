import { CityModel } from '../models/city'

export interface LoadCityByState {
  loadByState: (state: string) => Promise<CityModel[]>
}

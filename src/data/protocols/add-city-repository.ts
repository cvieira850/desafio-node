import { AddCityModel } from '../../domain/usecases/add-city'
import { CityModel } from '../../domain/models/city'

export interface AddCityRepository {
  add: (cityData: AddCityModel) => Promise<CityModel>
}

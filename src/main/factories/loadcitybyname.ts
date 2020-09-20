import { LoadCityByNameController } from '../../presentation/controllers/loadcitybyname/loadcitybyname'
import { DbLoadCityByName } from '../../data/usecases/load-city-by-name/db-load-city-by-name'
import { CityPgRepository } from '../../infra/bd/postgresql/city-repository/city'

export const makeLoadCityByNameController = (): LoadCityByNameController => {
  const cityPgRepository = new CityPgRepository()
  const dbLoadCityByName = new DbLoadCityByName(cityPgRepository)
  return new LoadCityByNameController(dbLoadCityByName)
}

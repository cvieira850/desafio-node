import { LoadCityByStateController } from '../../presentation/controllers/loadcitybystate/loadcitybystate'
import { DbLoadCityByState } from '../../data/usecases/load-city-by-state/db-load-city-by-state'
import { CityPgRepository } from '../../infra/bd/postgresql/city-repository/city'

export const makeLoadCityByStateController = (): LoadCityByStateController => {
  const cityPgRepository = new CityPgRepository()
  const dbLoadCityByState = new DbLoadCityByState(cityPgRepository)
  return new LoadCityByStateController(dbLoadCityByState)
}
